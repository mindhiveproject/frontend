// https://github.com/vega/react-vega/tree/master/packages/react-vega
// https://vega.github.io/vega-lite/
import React, { Component } from 'react';
import { Vega } from 'react-vega';

import styled from 'styled-components';

const StyledRender = styled.div`
  display: grid;
  margin: 10px;
  justify-content: center;
`;

class Render extends Component {
  state = {
    transformedData: [],
  };

  render() {
    // get the specification
    const spec = this.props.spec || {};
    const specWithData = {
      ...spec,
      data: {
        name: 'values',
        values: [...this.props.data],
      },
    };
    return (
      <StyledRender>
        <Vega
          spec={specWithData}
          actions={{
            export: true,
            source: false,
            compiled: false,
            editor: false,
          }}
          onParseError={error => {
            console.log('error', error);
          }}
          onNewView={view => {
            const newData = view.data('data_0');
            if (
              newData &&
              newData.length &&
              JSON.stringify(newData) !==
                JSON.stringify(this.state.transformedData)
            ) {
              console.log('transformedData', newData);
              this.setState({
                transformedData: [...newData],
              });
              this.props.updateState('transformedData', newData);
            }
          }}
        />
      </StyledRender>
    );
  }
}

export default Render;
