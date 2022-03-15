import { useMemo } from 'react';

import Router from './router';

const LZUTF8 = require('lzutf8');

// takes in the raw data and merge it together
// it can extract either incremental or full data (dependent on what is available)
const processRawData = results => {
  const allData = results
    .filter(
      result => result.resultType === null || result.resultType !== 'TEST'
    )
    .map(result => {
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

      let { data } = result;
      const fullContent = result.fullData?.content;
      const incrementalContent =
        result.incrementalData.length &&
        result.incrementalData.map(d => d.content);
      if (fullContent) {
        data = JSON.parse(
          LZUTF8.decompress(fullContent, {
            inputEncoding: 'StorageBinaryString',
          })
        );
      }
      if (!fullContent && incrementalContent && incrementalContent.length) {
        data = incrementalContent
          .map(p =>
            JSON.parse(
              LZUTF8.decompress(p, {
                inputEncoding: 'StorageBinaryString',
              })
            )
          )
          .reduce((total, amount) => total.concat(amount), []);
      }
      // augment the raw data with participant information
      const resultData = data.map(line => {
        line.participantId = participantId;
        line.task = result.task && result.task.title;
        line.taskTitle = result.task && result.task.subtitle;
        line.testVersion = result.testVersion && result.testVersion;
        line.study = result.study && result.study.title;
        line.dataType = fullContent ? 'complete' : 'incremental';
        return line;
      });
      return resultData;
    })
    .reduce((a, b) => a.concat(b), []);

  return allData;
};

const aggregate = data => {
  const aggregated = data
    .filter(row => row.aggregated)
    .map(f => ({
      study: f.study,
      task: f.task,
      taskSubtitle: f.taskSubtitle,
      testVersion: f.testVersion,
      participantId: f.participantId,
      ...f.aggregated,
    }));
  return aggregated;
};

const perParticipant = aggregated => {
  const allParticipants = aggregated.map(row => row?.participantId);
  const participants = [...new Set(allParticipants)];
  const dataByParticipant = participants.map(participant => {
    const data = {};
    const participantData = aggregated.filter(
      row => row?.participantId === participant
    );
    participantData.map(row => {
      Object.keys(row).map(key => {
        const newKey = `${row?.task}-${row?.testVersion}-${key}`;
        data[newKey] = row[key];
      });
    });
    return {
      participantId: participant,
      ...data,
    };
  });
  return dataByParticipant;
};

export default function FunctionalWrapper({ myStudyResults }) {
  const processedData = useMemo(() => processRawData(myStudyResults), [
    myStudyResults,
  ]);

  const dataAggregated = useMemo(() => aggregate(processedData), [
    processedData,
  ]);

  const dataParticipant = useMemo(() => perParticipant(dataAggregated), [
    dataAggregated,
  ]);

  return (
    <Router
      data={processedData}
      dataAggregated={dataAggregated}
      dataParticipant={dataParticipant}
    />
  );
}
