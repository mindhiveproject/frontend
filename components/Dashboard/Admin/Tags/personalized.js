import React, { Component } from 'react';

import Tags from './tags';
import AddTag from './addtag';
import TagPage from './tagpage';

import AuthorizedPage from '../../../Page/userpage';

class DashboardTags extends Component {
  state = {
    page: this.props.page || 'tags',
    tag: null,
  };

  addTag = () => {
    this.setState({
      page: 'addtag',
    });
  };

  openTag = tag => {
    this.setState({
      page: 'tagpage',
      tag,
    });
  };

  goBack = () => {
    this.setState({
      page: 'tags',
      tag: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'tags') {
      return (
        <AuthorizedPage>
          <Tags
            addTag={this.addTag}
            openTag={this.openTag}
          />
        </AuthorizedPage>
      );
    }

    if (page === 'tagpage') {
      return (
        <AuthorizedPage>
          <TagPage
            tag={this.state.tag}
            goBack={this.goBack}
            tagTemplateMode
          />
        </AuthorizedPage>
      );
    }

    if (page === 'addtag') {
      return (
        <AuthorizedPage>
          <AddTag goBack={this.goBack} />
        </AuthorizedPage>
      );
    }
  }
}

export default DashboardTags;
