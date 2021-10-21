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
        line.participantId =
          result.user &&
          (result.user.publicReadableId ||
            result.user.publicId ||
            result.user.id);
        line.task = result.task && result.task.title;
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

export default function FunctionalWrapper({ myStudyResults }) {
  const processedData = useMemo(() => processRawData(myStudyResults), [
    myStudyResults,
  ]);

  return <Router data={processedData} />;
}
