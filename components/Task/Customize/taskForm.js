import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import VasBuilder from './Builder/vasBuilder';
import SelectOne from './Builder/selectOne';
import SurveyBuilder from './Builder/surveyBuilder';
import ArrayBuilder from './Builder/arrayBuilder';

import { CURRENT_USER_QUERY } from '../../User/index';

import { StyledTaskForm, StyledTaskBlock, ControlButtons } from '../styles';
import ExperimentPreview from '../Preview/index';

import SettingsBlock from './setting';

// write a query here, later refactor it in a separate file if it is used elsewhere
const CONSENTS_QUERY = gql`
  query CONSENTS_QUERY {
    consents {
      id
      title
    }
  }
`;

class TaskForm extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  renderInput(type, name, value, options, array) {
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
      case 'array':
        return (
          <ArrayBuilder
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
      <Query query={CONSENTS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading ... </p>;
          const { consents } = data;
          console.log('consents', consents);
          return (
            <>
              <StyledTaskForm onSubmit={this.props.onHandleSubmit}>
                <h2>Edit your parameters</h2>

                <fieldset
                  disabled={this.props.loading}
                  aria-busy={this.props.loading}
                >
                  <ControlButtons>
                    <button onClick={this.togglePreview}>Preview task</button>
                    <button type="submit">
                      Sav{this.props.loading ? 'ing' : 'e'} changes
                    </button>
                  </ControlButtons>

                  <StyledTaskBlock htmlFor="title">
                    <div className="help">
                      Give a title to your new experiment
                    </div>
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

                    {this.props.allowEditSlug && (
                      <>
                        <div className="help">Slug for url</div>

                        <div>mindhive.science/tasks/{this.props.slug}</div>
                        <div>
                          A tip: avoid spaces in your slug to keep it clean and
                          healthy! Use dashes, for example.
                        </div>

                        <div className="input">
                          <input
                            type="text"
                            id="slug"
                            name="slug"
                            placeholder="Slug for url"
                            value={this.props.slug}
                            onChange={this.props.onHandleChange}
                            required
                          />
                        </div>
                      </>
                    )}

                    <h2>IRB consent</h2>
                    <select
                      type="text"
                      id="consent"
                      name="consent"
                      value={this.props.consent}
                      onChange={this.props.onHandleChange}
                    >
                      <option value="no">Choose the consent form</option>
                      {consents.map(consent => (
                        <option key={consent.id} value={consent.id}>
                          {consent.title}
                        </option>
                      ))}
                    </select>

                    <h2>Study collaborators (enter usernames)</h2>
                    {this.props.collaborators &&
                      this.props.collaborators.map((name, i) => (
                        <input
                          key={i}
                          name={i}
                          value={this.props.collaborators[i]}
                          onChange={this.props.onCollaboratorsChange}
                        />
                      ))}

                    {this.props.link && (
                      <>
                        <div className="help">Web link (https://)</div>
                        <div className="input">
                          <input
                            type="text"
                            id="link"
                            name="link"
                            placeholder="Web link"
                            value={this.props.link}
                            onChange={this.props.onHandleChange}
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="help">Description</div>
                    <div className="input">
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={this.props.description}
                        onChange={this.props.onHandleChange}
                      />
                    </div>

                    {Object.keys(this.props.settings).map((name, i) => (
                      <SettingsBlock
                        key={i}
                        name={name}
                        value={this.props.settings[name]}
                        onChange={this.props.onHandleSettingsChange}
                      />
                    ))}
                  </StyledTaskBlock>

                  {this.props.parameters.map(
                    ({ name, value, type, help, example, options, array }) => (
                      <StyledTaskBlock key={name} htmlFor={name}>
                        <div className="help">{help}</div>
                        <div className="example">{example}</div>
                        <div className="input">
                          {this.renderInput(type, name, value, options, array)}
                        </div>
                      </StyledTaskBlock>
                    )
                  )}
                </fieldset>
              </StyledTaskForm>

              {this.state.showPreview && (
                <Query query={CURRENT_USER_QUERY}>
                  {({ data, loading }) => {
                    if (loading) return <p>Loading ... </p>;
                    if (!data?.me) {
                      return false;
                    }
                    return (
                      <ExperimentPreview
                        user={data?.me?.id}
                        parameters={this.props.parameters}
                        template={this.props.template}
                        handleFinish={() =>
                          this.setState({ showPreview: false })
                        }
                      />
                    );
                  }}
                </Query>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default TaskForm;
export { CONSENTS_QUERY };
