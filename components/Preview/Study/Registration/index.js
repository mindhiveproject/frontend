import React, { Component } from 'react';
import FlowWrapper from './flowWrapper';

class StudyRegistration extends Component {
  state = {
    query: {
      step: 'details',
    },
  };

  isUnder18 = birthdayTimestamp => {
    const diff = Date.now() - birthdayTimestamp;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
    return diff / millisecondsInYear < 18;
  };

  proceed = ({ hasConsent, generalInfo }) => {
    if (this.props.study?.settings?.minorsBlocked && generalInfo?.bd) {
      if (this.isUnder18(generalInfo?.bd)) {
        this.setState({
          query: { step: 'blocked' },
        });
        return;
      }
    }

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

      if (this.props.study?.settings?.proceedToFirstTask) {
        if (block?.tests.length) {
          const componentId = block?.tests.map(test => test?.id)[0];
          const versionId = block?.tests.map(test => test?.testId)[0];
          this.props.onStartTheTask({ window: 'task', componentId, versionId });
        } else {
          alert(
            `There are no tasks or surveys in the condition ${block?.title}`
          );
        }
      } else {
        this.props.onFinishRegistration({ window: 'study' });
      }
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
        onStartTheTask={this.props.onStartTheTask}
      />
    );
  }
}

export default StudyRegistration;
