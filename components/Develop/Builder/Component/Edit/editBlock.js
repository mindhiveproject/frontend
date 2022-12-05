import React, { Component } from 'react';
import EditBlockContent from './editBlockContent';

class EditBlock extends Component {
  render() {
    const { task } = this.props;
    // get the value of the first page
    let text = '';
    if (task?.parameters && task?.parameters.length) {
      const [parameter] = task.parameters;
      if (parameter && parameter?.value) {
        try {
          const items = JSON.parse(parameter?.value) || [];
          const [item] = items;
          const pages = item?.page;
          const [page] = pages;
          text = page?.text;
        } catch (error) {
          console.log({ error });
        }
      }
    }
    return (
      <EditBlockContent
        text={text}
        handleParameterChange={this.props.handleParameterChange}
      />
    );
  }
}

export default EditBlock;
