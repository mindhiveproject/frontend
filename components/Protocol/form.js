import React, { Component } from 'react';
import Error from '../ErrorMessage/index';

import { SimpleStyledForm } from '../Styles/Forms';
import { ControlButtons } from '../Task/styles';

import InformationBlock from './block';

class EditProtocolForm extends Component {
  state = {
    title: this.props.consent?.title || '',
    description: this.props.consent?.description || '',
    organization: this.props.consent?.organization || '',
    info: this.props.consent?.info || [
      { name: 'regularAdults' },
      { name: 'regularMinors' },
      { name: 'regularMinorsKids' },
      { name: 'sonaAdults' },
      { name: 'sonaMinors' },
      { name: 'sonaMinorsKids' },
    ],
    settings: this.props.consent?.settings || {},
    collaborators: (this.props.consent.collaborators &&
      this.props.consent.collaborators.map(c => c.username).length &&
      this.props.consent.collaborators.map(c => c.username)) || [''],
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  handleInfoChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      info: this.state.info.map(el =>
        el.name === name ? { ...el, [className]: val } : el
      ),
    });
  };

  deleteParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      info: this.state.info.filter(el => el.name !== name),
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    const collaborators = [...this.state.collaborators];
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      collaborators,
    });
  };

  handleAddNewParameter = e => {
    e.preventDefault();
    const name = document.querySelector('#newParameterName').value;
    if (name) {
      this.setState({
        info: [...this.state.info, { name }],
      });
    }
  };

  render() {
    return (
      <SimpleStyledForm
        onSubmit={e => this.props.onSubmit(e, this.state, this.props.callback)}
      >
        <h2>{this.props.title}</h2>
        <Error error={this.props.error} />
        <fieldset disabled={this.props.loading} aria-busy={this.props.loading}>
          <ControlButtons>
            <button type="submit">
              Sav{this.props.loading ? 'ing' : 'e'} changes
            </button>
          </ControlButtons>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="title">
            Organization
            <input
              type="text"
              id="organization"
              name="organization"
              placeholder="Organization"
              value={this.state.organization}
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>

          <h2>Consent collaborators (enter usernames)</h2>
          {this.state.collaborators.map((name, i) => (
            <input
              key={i}
              name={i}
              value={this.state.collaborators[i]}
              onChange={this.handleCollaboratorsChange}
            />
          ))}

          {this.state.info.map((block, i) => (
            <InformationBlock
              key={i}
              block={block}
              onDelete={this.deleteParameter}
              onChange={this.handleInfoChange}
              onFileChange={this.uploadFileForInfo}
            />
          ))}

          <div>
            <input type="text" id="newParameterName" />
            <button onClick={this.handleAddNewParameter}>
              Add new information block
            </button>
          </div>
        </fieldset>
      </SimpleStyledForm>
    );
  }
}

export default EditProtocolForm;
