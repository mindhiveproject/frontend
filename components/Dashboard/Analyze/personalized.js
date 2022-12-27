import React, { Component } from 'react';

import Notebooks from './notebooks';
import NotebookPage from './notebookpage';
import AddNotebook from './addnotebook';

import AuthorizedPage from '../../Page/userpage';

class DashboardNotebook extends Component {
  state = {
    page: this.props.page || 'notebooks',
    notebook: null,
  };

  addNotebook = () => {
    this.setState({
      page: 'addnotebook',
    });
  };

  openNotebook = notebook => {
    this.setState({
      page: 'notebookpage',
      notebook,
    });
  };

  goBack = () => {
    this.setState({
      page: 'notebooks',
      notebook: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'notebooks') {
      return (
        <AuthorizedPage>
          <Notebooks
            addNotebook={this.addNotebook}
            openNotebook={this.openNotebook}
          />
        </AuthorizedPage>
      );
    }

    if (page === 'notebookpage') {
      return (
        <NotebookPage notebook={this.state.notebook} goBack={this.goBack} />
      );
    }

    if (page === 'addnotebook') {
      return <AddNotebook goBack={this.goBack} />;
    }
  }
}

export default DashboardNotebook;
