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

    return {
      participant: participantId,
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

export default function FunctionalWrapper({ results }) {
  const processedData = useMemo(() => processData(results), [results]);
  const dataParticipant = useMemo(() => aggregateByParticipant(processedData), [
    processedData,
  ]);
  return <Router data={processedData} dataParticipant={dataParticipant} />;
}

// const LZUTF8 = require('lzutf8');

// let { data } = result;
// const fullContent = result.fullData?.content;
// const incrementalContent =
//   result.incrementalData.length &&
//   result.incrementalData.map(d => d.content);
// if (fullContent) {
//   data = JSON.parse(
//     LZUTF8.decompress(fullContent, {
//       inputEncoding: 'StorageBinaryString',
//     })
//   );
// }
// if (!fullContent && incrementalContent && incrementalContent.length) {
//   data = incrementalContent
//     .map(p =>
//       JSON.parse(
//         LZUTF8.decompress(p, {
//           inputEncoding: 'StorageBinaryString',
//         })
//       )
//     )
//     .reduce((total, amount) => total.concat(amount), []);
// }
// augment the raw data with participant information
// const resultData = data.map(line => {
//   line.participantId = participantId;
//   line.task = result.task && result.task.title;
//   line.taskTitle = result.task && result.task.subtitle;
//   line.testVersion = result.testVersion && result.testVersion;
//   line.study = result.study && result.study.title;
//   line.dataType = fullContent ? 'complete' : 'incremental';
//   return line;
// });

// const dataAggregated = useMemo(() => aggregate(processedData), [
//   processedData,
// ]);

// const aggregate = data => {
//   const aggregated = data
//     .filter(row => row.aggregated)
//     .map(f => ({
//       study: f.study,
//       task: f.task,
//       taskSubtitle: f.taskSubtitle,
//       testVersion: f.testVersion,
//       participantId: f.participantId,
//       ...f.aggregated,
//     }));
//   return aggregated;
// };
