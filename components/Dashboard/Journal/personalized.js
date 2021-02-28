import React, { Component } from 'react';

import Journals from './journals';
import JournalPage from './journalpage';
import AddJournal from './addjournal';

import AuthorizedPage from '../../Page/userpage';

class DashboardJournal extends Component {
  state = {
    page: this.props.page || 'journals',
    journal: null,
  };

  addJournal = () => {
    this.setState({
      page: 'addjournal',
    });
  };

  openJournal = journal => {
    this.setState({
      page: 'journalpage',
      journal,
    });
  };

  goBack = () => {
    this.setState({
      page: 'journals',
      journal: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'journals') {
      return (
        <AuthorizedPage>
          <Journals
            addJournal={this.addJournal}
            openJournal={this.openJournal}
          />
        </AuthorizedPage>
      );
    }

    if (page === 'journalpage') {
      return (
        <AuthorizedPage>
          <JournalPage journal={this.state.journal} goBack={this.goBack} />
        </AuthorizedPage>
      );
    }

    if (page === 'addjournal') {
      return <AddJournal goBack={this.goBack} />;
    }
  }
}

export default DashboardJournal;
