// https://github.com/vega/react-vega/tree/master/packages/react-vega
// https://vega.github.io/vega-lite/
import React, { Component } from 'react';
import { VegaLite } from 'react-vega';

class Render extends Component {
  render() {
    // get the specification
    const spec = this.props.spec || {};

    const data = {
      values: this.props.data,
    };

    return <VegaLite spec={spec} data={data} />;
  }
}

export default Render;
