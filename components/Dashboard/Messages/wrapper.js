import React, { Component } from 'react';

import Talks from './Talks/list';
import AddTalk from './Talks/addtalk';
import TalkPage from './Talks/page';

class HomeDashboard extends Component {
  state = {
    page: this.props.page || 'talks',
    talkId: null,
  };

  addTalk = () => {
    console.log('adding a talk');
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

  render() {
    const { page } = this.state;

    if (page === 'talks') {
      return <Talks addTalk={this.addTalk} openTalk={this.openTalk} />;
    }

    if (page === 'addtalk') {
      return <AddTalk goBack={this.goBack} />;
    }

    if (page === 'talkpage') {
      return <TalkPage talkId={this.state.talkId} goBack={this.goBack} />;
    }

    return <h1>Messages</h1>;
  }
}

export default HomeDashboard;
