// https://github.com/vega/react-vega/tree/master/packages/react-vega
// https://vega.github.io/vega-lite/
import React, { Component } from 'react';
import { VegaLite } from 'react-vega';

class Render extends Component {
  render() {
    // get the transformation pipeline
    const transform = this.props.transform.map(t => t.parameters);
    const spec = this.props.spec || {};
    // const spec = {
    //   width: 400,
    //   height: 300,
    //   mark: 'point', // bar, point
    //   transform,
    //   encoding: {
    //     x: {
    //       field: 'color',
    //       type: 'ordinal',
    //       title: 'Color',
    //     },
    //     y: {
    //       field: 'duration-mean',
    //       type: 'quantitative',
    //       title: 'Time',
    //     },
    //   },
    //   data: { name: 'values' }, // note: vega-lite data attribute is a plain object instead of an array
    // };

    const barData = {
      values: this.props.data,
    };

    return <VegaLite spec={spec} data={barData} />;
  }
}

export default Render;
