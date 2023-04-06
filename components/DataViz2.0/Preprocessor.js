import { useMemo } from "react";
import StateManager from "./StateManager";

// get all column names of the dataset
const getColumnNames = (data) => {
  const allKeys = data
    .map((line) => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys)).sort();
  return keys;
};

// pre-process and aggregate data on the subject level
const process = ({ data, username }) => {
  const res = data.map((result) => {
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
    const classCode = result?.user?.studentIn?.map((c) => c?.code) || undefined;
    const userType = result?.guest ? "guest" : "user";

    return {
      participant: participantId,
      classCode,
      userType,
      study: result.study.title,
      task: result.task.title,
      testVersion: result.testVersion,
      timestamp: result.createdAt,
      ...result.data,
    };
  });

  const allParticipants = res.map((row) => row?.participant);
  const participants = [...new Set(allParticipants)];
  const dataByParticipant = participants.map((participant) => {
    const data = {};
    const participantData = res.filter(
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
      isMine: participant === username,
    };
  });
  const variables = getColumnNames(dataByParticipant);
  return { dataByParticipant, variables };
};

export default function Preprocessor({ studyId, data, user }) {
  // get the username of the active user
  // const username = user?.publicReadableId || user?.publicId || user?.id;
  const username = "decent-gullible-downtown";
  const { dataByParticipant, variables } = useMemo(
    () => process({ data, username }),
    [data, username]
  );

  return (
    <StateManager
      studyId={studyId}
      data={dataByParticipant}
      variables={variables}
      user={user}
    />
  );
}
