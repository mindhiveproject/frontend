import { useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";

import { useLazyQuery } from "@apollo/client";
import { saveAs } from "file-saver";
import { jsonToCSV } from "react-papaparse";
import moment from "moment";

import {
  MY_STUDY_SUMMARY_RESULTS_QUERY,
  MY_STUDY_RESULTS_QUERY,
} from "../../../../Queries/Result";

const LZUTF8 = require("lzutf8");

export default function DownloadByComponent({ studyId, components }) {
  const [selected, setSelected] = useState([]);

  const [
    loadSummary,
    { called: calledSummary, loading: loadingSummary, data: dataSummary },
  ] = useLazyQuery(MY_STUDY_SUMMARY_RESULTS_QUERY, {
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
    variables: { studyId },
  });

  const [
    loadRaw,
    { called: calledRaw, loading: loadingRaw, data: dataRaw },
  ] = useLazyQuery(MY_STUDY_RESULTS_QUERY, {
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
    variables: { studyId },
  });

  const options = components.map((c) => ({
    ...c,
    key: c?.id,
    text: `${c?.title} (${c?.subtitle || c?.testId})`,
    value: c?.id,
  }));

  const onChange = (event, data) => {
    setSelected(data?.value);
  };

  // pre-process and aggregate data on the subject level
  const process = ({ data }) => {
    const dataByTask = data.map((result) => {
      const userID =
        result?.user?.publicReadableId ||
        result?.user?.publicId ||
        result?.user?.id ||
        "john-doe";

      const guestID =
        result?.guest?.publicReadableId ||
        result?.guest?.publicId ||
        result?.guest?.id ||
        "john-doe";

      const participantId = result?.guest ? guestID : userID;
      const classCode =
        result?.user?.studentIn?.map((c) => c?.code) || undefined;
      const userType = result?.guest ? "guest" : "user";

      return {
        participant: participantId,
        classCode,
        userType,
        study: result.study.title,
        task: result.task.title,
        testVersion: result.testVersion,
        subtitle: result?.task?.subtitle,
        timestamp: result.createdAt,
        ...result.data,
      };
    });
    return dataByTask;
  };

  // takes in the raw data and merge it together
  // it can extract either incremental or full data (dependent on what is available)
  const processRaw = ({ data }) => {
    const allData = data
      .filter(
        (result) => result.resultType === null || result.resultType !== "TEST"
      )
      .map((result) => {
        const userID =
          result?.user?.publicReadableId ||
          result?.user?.publicId ||
          result?.user?.id ||
          "john-doe";

        const guestID =
          result?.guest?.publicReadableId ||
          result?.guest?.publicId ||
          result?.guest?.id ||
          "john-doe";

        const participantId = result?.guest ? guestID : userID;

        let { data } = result;
        const fullContent = result.fullData?.content;
        const incrementalContent =
          result.incrementalData.length &&
          result.incrementalData.map((d) => d.content);
        if (fullContent) {
          data = JSON.parse(
            LZUTF8.decompress(fullContent, {
              inputEncoding: "StorageBinaryString",
            })
          );
        }
        if (!fullContent && incrementalContent && incrementalContent.length) {
          data = incrementalContent
            .map((p) =>
              JSON.parse(
                LZUTF8.decompress(p, {
                  inputEncoding: "StorageBinaryString",
                })
              )
            )
            .reduce((total, amount) => total.concat(amount), []);
        }
        // augment the raw data with participant information
        const resultData = data.map((line) => {
          line.participantId = participantId;
          line.task = result?.task?.title;
          line.subtitle = result?.task?.subtitle;
          line.testVersion = result?.testVersion;
          line.study = result?.study?.title;
          line.dataType = fullContent ? "complete" : "incremental";
          return line;
        });
        return resultData;
      })
      .reduce((a, b) => a.concat(b), []);

    return allData;
  };

  // download the current state of the data as a csv file
  const save = ({ data, task, type }) => {
    const name = `${task?.title}_${task?.subtitle ||
      task?.testId}_${type}_${moment().format()}`;
    const allKeys = data
      .map((line) => Object.keys(line))
      .reduce((a, b) => a.concat(b), []);
    const keys = Array.from(new Set(allKeys));
    const csv = jsonToCSV({ fields: keys, data });
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    saveAs(blob, `${name}.csv`);
  };

  const resolvePromisesSeq = async (tasks) => {
    const results = [];
    for (const task of tasks) {
      results.push(await task);
    }
    return results;
  };

  const downloadAggregated = async () => {
    const results = await loadSummary({ variables: { taskIds: selected } });
    const { summaryResults } = results?.data;
    const downloadPromises = selected.map(async (taskId) => {
      const taskResults = summaryResults.filter(
        (res) => res?.task?.id === taskId
      );
      save({
        data: process({ data: taskResults }),
        task: components.filter((c) => c?.id === taskId)[0],
        type: "aggregated",
      });
    });
    await resolvePromisesSeq(downloadPromises);
  };

  const downloadRaw = async () => {
    const results = await loadRaw({ variables: { taskIds: selected } });
    const { myStudyResults } = results?.data;
    const downloadPromises = selected.map(async (taskId) => {
      const taskResults = myStudyResults.filter(
        (res) => res?.task?.id === taskId
      );
      save({
        data: processRaw({ data: taskResults }),
        task: components.filter((c) => c?.id === taskId)[0],
        type: "raw",
      });
    });
    await resolvePromisesSeq(downloadPromises);
  };

  return (
    <div className="downloadByComponent">
      <h3>Data by task in separate files</h3>
      <Dropdown
        placeholder="Select tasks or surveys"
        fluid
        multiple
        search
        selection
        options={options}
        onChange={onChange}
        value={selected}
      />
      <>
        {loadingSummary ? (
          <div>Wait ...</div>
        ) : (
          <div className="downloadArea" onClick={() => downloadAggregated()}>
            <Icon color="teal" size="large" name="download" />
            <a>Download aggregated data</a>
          </div>
        )}
      </>
      <>
        {loadingRaw ? (
          <div>Wait ...</div>
        ) : (
          <div className="downloadArea" onClick={() => downloadRaw()}>
            <Icon color="teal" size="large" name="download" />
            <a>Download raw data</a>
          </div>
        )}
      </>
    </div>
  );
}
