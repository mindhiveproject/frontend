import React, { Component } from 'react';
import SelectorWrapper from '../Selector/index';
import StudyTagger from '../../../Tag/StudyTagger';
import { StyledSettings } from '../../styles';
import TaskModal from '../../Task/Modal';

export default class Settings extends Component {
  state = {
    modal: null,
  };

  openModal = (modal, component) => {
    this.setState({
      modal,
      component,
    });
  };

  onModalClose = () => {
    this.setState({
      modal: null,
      component: null,
    });
  };

  render() {
    return (
      <StyledSettings>
        <h2>Study settings</h2>
        <div className="card">
          <SelectorWrapper {...this.props} openModal={this.openModal} />
        </div>
        <div className="card">
          <StudyTagger {...this.props} />
        </div>
        {this.state.modal === 'task' && (
          <TaskModal {...this.props} onModalClose={this.onModalClose} />
        )}
      </StyledSettings>
    );
  }
}
