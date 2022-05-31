import React, { Component } from 'react';
import FlowWrapper from './flowWrapper';

class StudyRegistration extends Component {
  state = {
    query: {
      step: 'details',
    },
  };

  proceed = ({ hasConsent, generalInfo }) => {
    if (hasConsent) {
      this.props.onUpdateVirtualUser({
        ...this.props.user,
        generalInfo: { ...generalInfo },
      });
      // if study has consent, show the consent page
      this.setState({
        query: { step: 'consent' },
      });
    } else {
      // if the study does not have consent, proceed to the next page
      const { blocks } = this.props.study.components;
      const activeBlocks = blocks.filter(b => !b.skip);
      // get a random block out of study between-subjects blocks
      const block =
        activeBlocks[Math.floor(Math.random() * activeBlocks.length)];
      const info = {
        blockId: block.blockId,
        blockName: block.title,
      };
      const studiesInfo = { [this.props.study.id]: info };

      this.props.onUpdateVirtualUser({
        ...this.props.user,
        generalInfo: {
          ...this.state,
        },
        hasRegistered: true,
        studiesInfo,
      });

      this.props.onFinishRegistration({ window: 'study' });
    }
  };

  render() {
    const { study, user } = this.props;
    const { query } = this.state;

    return (
      <FlowWrapper
        query={query}
        study={study}
        user={user}
        proceed={this.proceed}
        onUpdateVirtualUser={this.props.onUpdateVirtualUser}
        onInterruptRegistration={this.props.onInterruptRegistration}
        onFinishRegistration={this.props.onFinishRegistration}
      />
    );
  }
}

export default StudyRegistration;
