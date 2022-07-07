import React, { Component } from 'react';
import ComponentSelector from './componentSelector';

export default class SelectorWrapper extends Component {
  render() {
    return <ComponentSelector {...this.props} />;
  }
}
