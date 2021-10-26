import React, { Component } from 'react';

import Talks from './Talks/list';
import AddTalk from './Talks/addtalk';
import TalkPage from './Talks/page';
import AddMembersToTalk from './Talks/addMembers';

class HomeDashboard extends Component {
  state = {
    page: this.props.page || 'talks',
    talkId: null,
  };

  addTalk = () => {
    this.setState({
      page: 'addtalk',
    });
  };

  openTalk = talkId => {
    this.setState({
      page: 'talkpage',
      talkId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'talks',
      talkId: null,
    });
  };

  openAddMembers = (talkId, talkTitle) => {
    this.setState({
      page: 'addmemberstotalk',
      talkId,
      talkTitle,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'talks') {
      return (
        <Talks
          addTalk={this.addTalk}
          openTalk={this.openTalk}
          openAddMembers={this.openAddMembers}
        />
      );
    }

    if (page === 'addtalk') {
      return <AddTalk goBack={this.goBack} />;
    }

    if (page === 'talkpage') {
      return <TalkPage talkId={this.state.talkId} goBack={this.goBack} />;
    }

    if (page === 'addmemberstotalk') {
      return (
        <AddMembersToTalk
          talkId={this.state.talkId}
          goBack={this.goBack}
          talkTitle={this.state.talkTitle}
        />
      );
    }

    return <h1>Messages</h1>;
  }
}

export default HomeDashboard;
