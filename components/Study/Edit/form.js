import React, { Component } from 'react';
import Error from '../../ErrorMessage/index';
import InformationBlock from './block';
import SettingsBlock from './setting';

import {
  StyledTaskForm,
  StyledTaskBlock,
  ControlButtons,
} from '../../Task/styles';

class EditStudyForm extends Component {
  state = {
    title: this.props.study.title || '',
    shortDescription: this.props.study.shortDescription || '',
    description: this.props.study.description || '',
    settings: {
      consentObtained: false,
      guestParticipation: false,
      zipCode: true,
      proceedToFirstTask: false,
      ...this.props.study.settings,
    },
    image: this.props.study.image || '',
    largeImage: this.props.study.largeImage || '',
    info: this.props.study.info || [
      { name: 'what' },
      { name: 'who' },
      { name: 'how' },
      { name: 'faq' },
      { name: 'more' },
      { name: 'time' },
      { name: 'frequency' },
      { name: 'partners' },
      { name: 'tags' },
      { name: 'contacts' },
      { name: 'consentForm' },
      { name: 'consentFormForParents' },
      { name: 'thankYouMessage' },
    ],
    collaborators: (this.props.study.collaborators &&
      this.props.study.collaborators.map(c => c.username).length &&
      this.props.study.collaborators.map(c => c.username)) || [''],
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  uploadFileForInfo = async e => {
    const { files, name, className } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    this.setState({
      info: this.state.info.map(el =>
        el.name === name ? { ...el, [className]: file.secure_url } : el
      ),
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

  handleAddNewParameter = e => {
    e.preventDefault();
    const name = document.querySelector('#newParameterName').value;
    if (name) {
      this.setState({
        info: [...this.state.info, { name }],
      });
    }
  };

  deleteParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      info: this.state.info.filter(el => el.name !== name),
    });
  };

  handleSettingsChange = e => {
    const { name } = e.target;
    const value = e.target.checked;
    const settings = { ...this.state.settings };
    settings[name] = value;
    this.setState({
      settings,
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    console.log('name value', name, value);
    const collaborators = [...this.state.collaborators];
    console.log('collaborators', collaborators);
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      collaborators,
    });
  };

  render() {
    return (
      <StyledTaskForm
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

          <StyledTaskBlock>
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
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                value={this.state.file}
                onChange={this.uploadFile}
              />
              {this.state.image && (
                <img width="200" src={this.state.image} alt="Upload preview" />
              )}
            </label>
            <label htmlFor="shortDescription">
              Description for researchers
              <textarea
                id="shortDescription"
                name="shortDescription"
                placeholder="Short description"
                value={this.state.shortDescription}
                onChange={this.handleChange}
                rows="5"
              />
            </label>
            <label htmlFor="description">
              Description for participants
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </StyledTaskBlock>

          <h2>Study collaborators (enter usernames)</h2>
          {this.state.collaborators.map((name, i) => (
            <input
              key={i}
              name={i}
              value={this.state.collaborators[i]}
              onChange={this.handleCollaboratorsChange}
            />
          ))}

          <h2>Study settings</h2>

          {Object.keys(this.state.settings).map((name, i) => (
            <SettingsBlock
              key={i}
              name={name}
              value={this.state.settings[name]}
              onChange={this.handleSettingsChange}
            />
          ))}

          <h2>Information about the study</h2>

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
      </StyledTaskForm>
    );
  }
}

export default EditStudyForm;
