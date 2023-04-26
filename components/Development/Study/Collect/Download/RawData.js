import { useLazyQuery } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import { jsonToCSV } from "react-papaparse";
import { MY_STUDY_RESULTS_QUERY } from "../../../../Queries/Result";

const LZUTF8 = require("lzutf8");

export default function DownloadRawData({ study }) {
  const [loadData, { called, loading, data }] = useLazyQuery(
    MY_STUDY_RESULTS_QUERY,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
      variables: { studyId: study?.id },
    }
  );

  // takes in the raw data and merge it together
  // it can extract either incremental or full data (dependent on what is available)
  const process = ({ data }) => {
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
  const save = ({ data }) => {
    const name = `${study?.slug}_raw_data_${moment().format()}`;
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
    const result = await loadData();
    const { myStudyResults } = result?.data;
    save({ data: process({ data: myStudyResults }) });
  };

  return (
    <>
      {loading ? (
        <div>Wait ...</div>
      ) : (
        <div className="downloadArea" onClick={() => download()}>
          <Icon color="teal" size="large" name="download" />
          <a>Download raw data</a>
        </div>
      )}
    </>
  );
}
