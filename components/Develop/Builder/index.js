import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import { StyledBoard } from '../styles';
import Settings from './Settings/index';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

// todo How to stop re-rendering the Diagram if the
// state of the study is updated

export default class Builder extends Component {
  render() {
    return (
      <StyledBoard>
        <DynamicDiagram
          handleSetMultipleValuesInState={
            this.props.handleSetMultipleValuesInState
          }
          diagram={this.props?.study?.diagram}
          // diagram={JSON.stringify(diagram)}
        />
        <Settings {...this.props} />
      </StyledBoard>
    );
  }
}

const diagram = {
  id: '3fd9b937-6b1b-475d-b95f-d7e1bd96f463',
  offsetX: 0,
  offsetY: 0,
  zoom: 100,
  gridSize: 0,
  layers: [
    {
      id: '5fe701b3-8ca2-4e67-8b08-aa5fc34bfa66',
      type: 'diagram-links',
      isSvg: true,
      transformed: true,
      models: {
        '5522415b-4421-4b15-9403-ff40b6a340a8': {
          id: '5522415b-4421-4b15-9403-ff40b6a340a8',
          type: 'default',
          selected: true,
          source: '479511ab-a464-4618-9039-b173661c0d22',
          sourcePort: 'e7013e41-2495-490b-80ec-6e6d870a2111',
          target: '496defc0-e1b7-4ba7-9346-55b9ac4ca29c',
          targetPort: '7e42dad7-f1d2-4fbf-8020-e91be77732ae',
          points: [
            {
              id: '6c040461-9437-4c26-a7ae-2f728c4fe406',
              type: 'point',
              x: 563.5,
              y: 218.5,
            },
            {
              id: '4a17e161-c7cb-4b97-82d1-e5a9afc4cf3c',
              type: 'point',
              x: 611.5,
              y: 351.5,
            },
          ],
          labels: [],
          width: 3,
          color: 'gray',
          curvyness: 50,
          selectedColor: 'rgb(0,192,255)',
        },
      },
    },
    {
      id: '1070267f-7e7f-4f5b-8045-739f6fbe96c8',
      type: 'diagram-nodes',
      isSvg: false,
      transformed: true,
      models: {
        '479511ab-a464-4618-9039-b173661c0d22': {
          id: '479511ab-a464-4618-9039-b173661c0d22',
          type: 'my-node',
          x: 378,
          y: 94,
          node: {
            options: {
              name: 'Name',
            },
          },
          options: {
            name: 'Name',
          },
          name: 'fd',
          ports: [
            {
              id: '7153fcb6-d6bd-4484-8981-c7ac3a388591',
              type: 'default',
              x: 557,
              y: 85,
              name: 'in',
              alignment: 'left',
              parentNode: '479511ab-a464-4618-9039-b173661c0d22',
              links: [],
              in: true,
              label: 'in',
            },
            {
              id: 'e7013e41-2495-490b-80ec-6e6d870a2111',
              type: 'default',
              x: 557,
              y: 215,
              name: 'out',
              alignment: 'right',
              parentNode: '479511ab-a464-4618-9039-b173661c0d22',
              links: ['5522415b-4421-4b15-9403-ff40b6a340a8'],
              in: false,
              label: 'out',
            },
          ],
        },
        '496defc0-e1b7-4ba7-9346-55b9ac4ca29c': {
          id: '496defc0-e1b7-4ba7-9346-55b9ac4ca29c',
          type: 'my-node',
          x: 426,
          y: 354,
          ports: [
            {
              id: '7e42dad7-f1d2-4fbf-8020-e91be77732ae',
              type: 'default',
              x: 605,
              y: 345,
              name: 'in',
              alignment: 'left',
              parentNode: '496defc0-e1b7-4ba7-9346-55b9ac4ca29c',
              links: ['5522415b-4421-4b15-9403-ff40b6a340a8'],
              in: true,
              label: 'in',
            },
            {
              id: 'f1d600c3-6cf7-426f-b2d4-5b7398a58be7',
              type: 'default',
              x: 605,
              y: 475,
              name: 'out',
              alignment: 'right',
              parentNode: '496defc0-e1b7-4ba7-9346-55b9ac4ca29c',
              links: [],
              in: false,
              label: 'out',
            },
          ],
        },
      },
    },
  ],
};
