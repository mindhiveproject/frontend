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
const process = (results) => {
  const res = results.map((result) => {
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
    };
  });
  const variables = getColumnNames(dataByParticipant);
  return { dataByParticipant, variables };
};

export default function Preprocessor({ data, user, scripts }) {
  const { dataByParticipant, variables } = useMemo(() => process(data), [data]);

  return (
    <StateManager
      data={dataByParticipant}
      variables={variables}
      user={user}
      scripts={scripts}
    />
  );
}
