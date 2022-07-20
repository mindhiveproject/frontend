import { useState } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import { jsonToCSV } from 'react-papaparse';
import streamSaver from 'streamsaver';
import moment from 'moment';
import { Dimmer, Loader } from 'semantic-ui-react';

const LZUTF8 = require('lzutf8');

// get my artworks
const MY_DATA_QUERY = gql`
  query MY_DATA_QUERY($id: ID) {
    data(where: { id: $id }) {
      id
      content
    }
  }
`;

const load = ({ result, content, writer, type }) => {
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

  // decode
  const myData = JSON.parse(
    LZUTF8.decompress(content, {
      inputEncoding: 'StorageBinaryString',
    })
  );
  // populate data with participant information
  const extendedData = myData.map(line => {
    line.participantId = participantId;
    line.task = result.task && result.task.title;
    line.taskTitle = result.task && result.task.subtitle;
    line.testVersion = result.testVersion && result.testVersion;
    line.study = result.study && result.study.title;
    line.type = type;
    return line;
  });

  const aggregated = extendedData
    .filter(row => row.aggregated)
    .map(f => ({
      study: f.study,
      task: f.task,
      taskTitle: f.taskTitle,
      testVersion: f.testVersion,
      participantId: f.participantId,
      ...f.aggregated,
    }));

  const allKeys = aggregated
    .map(line => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys));
  const csv = jsonToCSV({ fields: keys, data: aggregated });
  const uInt8 = new TextEncoder().encode(`${csv}\n`);

  writer.write(uInt8);
};

export default function AggregatedByTest({ results }) {
  const [findData, { loading, data, error }] = useLazyQuery(MY_DATA_QUERY);
  const [isLoading, setIsLoading] = useState(false);

  // download the current state of the data as a csv file
  async function downloadData({ results }) {
    setIsLoading(true);

    const fileStream = streamSaver.createWriteStream(
      `data-${moment().format('YYYY-MM-DD--HH:mm')}.csv`,
      {
        writableStrategy: undefined, // (optional)
        readableStrategy: undefined, // (optional)
      }
    );

    const writer = fileStream.getWriter();

    for (const result of results) {
      if (result?.fullData?.id) {
        const res = await findData({
          variables: {
            id: result?.fullData?.id,
          },
        });
        load({
          result,
          content: res?.data?.data?.content,
          writer,
          type: 'full',
        });
      } else if (result?.incrementalData?.length) {
        for (const incResult of result?.incrementalData) {
          const res = await findData({
            variables: {
              id: incResult?.id,
            },
          });
          load({
            result,
            content: res?.data?.data?.content,
            writer,
            type: 'partial',
          });
        }
      }
    }

    writer.close();
    setIsLoading(false);
  }

  return (
    <div>
      <button onClick={() => downloadData({ results })}>
        Download aggregated data
      </button>
      <Dimmer active={isLoading}>
        <Loader>Please wait while data is loading</Loader>
      </Dimmer>
    </div>
  );
}
