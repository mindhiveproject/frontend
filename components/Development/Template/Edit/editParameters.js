import React, { Component } from 'react';
import EditTemplateParameters from './editTemplateParameters';

class EditParameters extends Component {
  render() {
    const { template } = this.props;
    const parameters = template.parameters || [];

    return (
      <div>
        <p>
          You can use parameters to modify the template on the MindHive
          platform. Only parameters from the parent main component in the lab.js
          builder are imported.
        </p>
        <EditTemplateParameters
          parameters={parameters}
          handleTemplateParamChange={this.props.handleTemplateParamChange}
          deleteTemplateParameter={this.props.deleteTemplateParameter}
        />
      </div>
    );
  }
}

export default EditParameters;
