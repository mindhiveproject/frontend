import { useMemo } from 'react';
import Router from './router';

const processData = results => {
  const data = results.map(result => {
    const userID =
      result?.user?.publicReadableId ||
      result?.user?.publicId ||
      result?.user?.id ||
      'john-doe';

    const guestID =
      result?.guest?.publicReadableId ||
      result?.guest?.publicId ||
      result?.guest?.id ||
      'john-doe';

    const participantId = result?.guest ? guestID : userID;

    const classCode = result?.user?.studentIn?.map(c => c?.code) || undefined;
    const userType = result?.guest ? 'guest' : 'user';

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

  return data;
};

const aggregateByParticipant = results => {
  const allParticipants = results.map(row => row?.participant);
  const participants = [...new Set(allParticipants)];
  const dataByParticipant = participants.map(participant => {
    const data = {};
    const participantData = results.filter(
      row => row?.participant === participant
    );
    participantData.map(row => {
      Object.keys(row).map(key => {
        const newKey = `${row?.task}-${row?.testVersion}-${key}`;
        data[newKey] = row[key];
      });
    });
    return {
      participant,
      ...data,
    };
  });
  return dataByParticipant;
};

export default function FunctionalWrapper({ results, user }) {
  const processedData = useMemo(() => processData(results), [results]);
  const dataParticipant = useMemo(() => aggregateByParticipant(processedData), [
    processedData,
  ]);
  return (
    <Router
      user={user}
      data={processedData}
      dataParticipant={dataParticipant}
    />
  );
}
