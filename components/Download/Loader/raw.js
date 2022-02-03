import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import { jsonToCSV } from 'react-papaparse';
import { saveAs } from 'file-saver';
import streamSaver from 'streamsaver';
import moment from 'moment';

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
  // decode
  const myData = JSON.parse(
    LZUTF8.decompress(content, {
      inputEncoding: 'StorageBinaryString',
    })
  );
  // populate data with participant information
  const extendedData = myData.map(line => {
    line.participantId =
      result.user &&
      (result.user.publicReadableId || result.user.publicId || result.user.id);
    line.task = result.task && result.task.title;
    line.taskTitle = result.task && result.task.subtitle;
    line.testVersion = result.testVersion && result.testVersion;
    line.study = result.study && result.study.title;
    line.type = type;
    return line;
  });

  // console.log('myData', myData);
  const allKeys = extendedData
    .map(line => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys));
  // console.log('keys', keys);
  const csv = jsonToCSV({ fields: keys, data: extendedData });
  // console.log('csv', csv);
  const uInt8 = new TextEncoder().encode(`${csv}\n`);

  writer.write(uInt8);
};

export default function Loader({ results }) {
  const [findData, { loading, data, error }] = useLazyQuery(MY_DATA_QUERY);

  // download the current state of the data as a csv file
  async function downloadData({ results }) {
    console.log('Downloading data for', results);

    const fileStream = streamSaver.createWriteStream(
      `data-${moment().format('YYYY-MM-DD--HH:mm')}.csv`,
      {
        writableStrategy: undefined, // (optional)
        readableStrategy: undefined, // (optional)
      }
    );

    const writer = fileStream.getWriter();

    for (const result of results) {
      // console.log('id', id);

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
  }

  return (
    <div>
      <button onClick={() => downloadData({ results })}>
        Download raw data
      </button>
    </div>
  );
}
