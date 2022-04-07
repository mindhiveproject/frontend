import React, { Component } from 'react';
import Error from '../ErrorMessage/index';

import { StyledViewProtocolPage } from './styles';

import ViewInformationBlock from './viewBlock';

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
      { name: 'studentsNYC' },
      { name: 'studentsMinorsNYC' },
      { name: 'studentsParentsNYC' },
    ],
    settings: this.props.consent?.settings || {},
    collaborators: (this.props.consent.collaborators &&
      this.props.consent.collaborators.map(c => c.username).length &&
      this.props.consent.collaborators.map(c => c.username)) || [''],
  };

  render() {
    return (
      <StyledViewProtocolPage>
        <div>
          <h1>{this.state.title}</h1>
        </div>

        <div>
          <h3>Organization</h3>
          <p>{this.state.organization}</p>
        </div>

        <div>
          <h3>Description</h3>
          <p>{this.state.description}</p>
        </div>

        <div>
          <h3>Consent collaborators</h3>
          {this.state.collaborators.map((name, i) => (
            <p>{name}</p>
          ))}
        </div>

        <div>
          <h3>Forms</h3>
          {this.state.info.map((block, i) => (
            <ViewInformationBlock key={i} block={block} />
          ))}
        </div>
      </StyledViewProtocolPage>
    );
  }
}

export default EditProtocolForm;
