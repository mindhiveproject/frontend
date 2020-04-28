import React, { Component } from 'react';
import Link from 'next/link';
import VasBuilder from './vasBuilder';
import SelectOne from './selectOne';
import SurveyBuilder from './surveyBuilder';

import {
  StyledParameterForm,
  StyledParameterBlock,
  ControlButtons,
} from './styles';
import ExperimentPreview from '../Preview/index';

class ParameterForm extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  renderInput(type, name, value, options) {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={this.props.onHandleParamChange}
            required
          />
        );
      case 'vas':
        return (
          <VasBuilder
            name={name}
            statements={value}
            onChange={this.props.onHandleParamChange}
          />
        );
      case 'select':
        return (
          <SelectOne
            name={name}
            options={options}
            value={value}
            onChange={this.props.onHandleParamChange}
          />
        );
      case 'survey':
        return (
          <SurveyBuilder
            name={name}
            content={value}
            onChange={this.props.onHandleParamChange}
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={this.props.onHandleParamChange}
            required
          />
        );
    }
  }

  render() {
    return (
      <>
        <StyledParameterForm onSubmit={this.props.onHandleSubmit}>
          <h2>Edit your parameters</h2>

          <fieldset
            disabled={this.props.loading}
            aria-busy={this.props.loading}
          >
            <ControlButtons>
              <button onClick={this.togglePreview}>Preview experiment</button>
              <button type="submit">
                Sav{this.props.loading ? 'ing' : 'e'} changes
              </button>
            </ControlButtons>

            <StyledParameterBlock htmlFor="title">
              <div className="help">Give a title to your new experiment</div>
              <div className="input">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={this.props.title}
                  onChange={this.props.onHandleChange}
                  required
                />
              </div>
            </StyledParameterBlock>

            {this.props.data.map(
              ({ name, value, type, help, example, options }) => (
                <StyledParameterBlock key={name} htmlFor={name}>
                  <div className="help">{help}</div>
                  <div className="example">{example}</div>
                  <div className="input">
                    {this.renderInput(type, name, value, options)}
                  </div>
                </StyledParameterBlock>
              )
            )}
          </fieldset>
        </StyledParameterForm>

        {this.state.showPreview && (
          <ExperimentPreview
            parameters={this.props.data}
            experiment={this.props.experiment}
            handleFinish={() => this.setState({ showPreview: false })}
          />
        )}
      </>
    );
  }
}

export default ParameterForm;
