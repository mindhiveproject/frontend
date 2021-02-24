import React, { Component } from 'react';

class AddClass extends Component {
  render() {
    return (
      <div>
        <div className="goBackBtn">
          <span onClick={this.props.goBack}>← Back</span>
        </div>
        Add new class
        <p>In development</p>
      </div>
    );
  }
}

export default AddClass;
