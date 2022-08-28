import React, { Component } from 'react';

import VasBuilder from './Builder/vasBuilder';
import SelectOne from './Builder/selectOne';
import SurveyBuilder from './Builder/surveyBuilder';
import ArrayBuilder from './Builder/arrayBuilder';

import EditTemplateParameters from './editTemplateParameters';

import { StyledParameters, StyledTaskBlock } from '../styles';

class EditParameters extends Component {
  renderInput(type, name, value, options, array) {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={this.props.handleParameterChange}
            required
          />
        );
      case 'vas':
        return (
          <VasBuilder
            name={name}
            statements={value}
            onChange={this.props.handleParameterChange}
          />
        );
      case 'select':
        return (
          <SelectOne
            name={name}
            options={options}
            value={value}
            onChange={this.props.handleParameterChange}
          />
        );
      case 'survey':
        return (
          <SurveyBuilder
            name={name}
            content={value}
            onChange={this.props.handleParameterChange}
          />
        );
      case 'array':
        return (
          <ArrayBuilder
            name={name}
            content={value}
            onChange={this.props.handleParameterChange}
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={this.props.handleParameterChange}
            required
          />
        );
    }
  }

  render() {
    const { task, templateEditor } = this.props;
    const parameters = task.parameters || [];
    if (templateEditor) {
      return (
        <div>
          <p>
            You can use parameters to modify the task on the MindHive platform.
            Only parameters from the parent main component in the lab.js builder
            are imported.
          </p>
          <EditTemplateParameters
            parameters={parameters}
            handleTemplateParamChange={this.props.handleTemplateParamChange}
            deleteTemplateParameter={this.props.deleteTemplateParameter}
          />
        </div>
      );
    }

    return (
      <StyledParameters>
        {parameters.map(
          ({ name, value, type, help, example, options, array }) => (
            <StyledTaskBlock key={name} htmlFor={name}>
              <div className="block">
                <div className="help">
                  <h2>{help}</h2>
                </div>
                {example && (
                  <div className="example">
                    <p>{example}</p>
                  </div>
                )}

                <div className="input">
                  {this.renderInput(type, name, value, options, array)}
                </div>
              </div>
            </StyledTaskBlock>
          )
        )}
      </StyledParameters>
    );
  }
}

export default EditParameters;
