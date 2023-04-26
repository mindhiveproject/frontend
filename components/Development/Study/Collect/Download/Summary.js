import { useLazyQuery } from "@apollo/client";
import { saveAs } from "file-saver";
import { jsonToCSV } from "react-papaparse";
import moment from "moment";
import { Icon } from "semantic-ui-react";
import { MY_STUDY_SUMMARY_RESULTS_QUERY } from "../../../../Queries/Result";

export default function DownloadSummaryData({ by, study }) {
  const [loadData, { called, loading, data }] = useLazyQuery(
    MY_STUDY_SUMMARY_RESULTS_QUERY,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
      variables: { studyId: study?.id },
    }
  );

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

    if (by === "participant") {
      const allParticipants = dataByTask.map((row) => row?.participant);
      const participants = [...new Set(allParticipants)];
      const dataByParticipant = participants.map((participant) => {
        const data = {};
        const participantData = dataByTask.filter(
          (row) => row?.participant === participant
        );
        participantData.map((row) => {
          Object.keys(row).map((key) => {
            const newKey = `${row?.task.replace(/\s/g, "_")}_${
              row?.testVersion
            }_${key}`;
            data[newKey] = row[key];
          });
        });
        return {
          participant,
          ...data,
        };
      });
      return dataByParticipant;
    }
    return dataByTask;
  };

  // download the current state of the data as a csv file
  const save = ({ data }) => {
    const name = `${study?.slug}_${moment().format()}`;
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

  const download = async () => {
    const results = await loadData();
    const { summaryResults } = results?.data;
    save({ data: process({ data: summaryResults }) });
  };

  return (
    <>
      {loading ? (
        <div>Wait ...</div>
      ) : (
        <div className="downloadArea" onClick={() => download()}>
          <Icon color="teal" size="large" name="download" />
          <a>Download aggregated data {by}</a>
        </div>
      )}
    </>
  );
}
