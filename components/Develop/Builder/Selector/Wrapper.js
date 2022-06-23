import React, { Component } from 'react';
import ComponentSelector from './componentSelector';

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <h2>Add a study block</h2>
        <ComponentSelector />
      </div>
    );
  }
}
