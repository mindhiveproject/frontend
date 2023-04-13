import { useLazyQuery } from "@apollo/client";
import { MY_STUDY_RESULTS_QUERY } from "../../../../Queries/Result";

export default function DownloadRawData({ studyId }) {
  const [loadData, { called, loading, data }] = useLazyQuery(
    MY_STUDY_RESULTS_QUERY,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
      variables: { id: studyId },
    }
  );

  const download = () => {
    console.log("Downloading raw data ...", studyId);
    loadData();
  };

  if (data) {
    console.log({ data });
  }

  return <button onClick={() => download()}>Download raw data</button>;
}
