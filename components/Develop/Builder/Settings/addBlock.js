import React, { Component } from 'react';
import SelectorWrapper from '../Selector/index';

import TaskModal from '../../Task/Modal';

export default class AddBlock extends Component {
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
      <>
        <SelectorWrapper {...this.props} openModal={this.openModal} />

        {this.state.modal === 'task' && (
          <TaskModal
            {...this.props}
            component={this.state.component}
            onModalClose={this.onModalClose}
          />
        )}
      </>
    );
  }
}
