import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import ParticipantTable from './table';
import { StyledParticipantsBoard } from './styles';

class ParticipantsOverview extends Component {
  state = {
    sortBy: 'username',
  };

  sortBy = sortBy => {
    this.setState({
      sortBy,
    });
  };

  render() {
    const { participants } = this.props;

    const sortedParticipants = [...participants].sort(
      (a, b) => a[this.state.sortBy] - b[this.state.sortBy]
    );

    return (
      <div className="participants">
        <StyledParticipantsBoard>
          <div style={{ padding: '10px' }}>
            <h2>Responses</h2>
          </div>
          <div className="tableHeader">
            <p onClick={() => this.sortBy('publicReadableId')}>
              Readable ID{' '}
              {this.state.sortBy === 'publicReadableId' ? (
                <Icon name="arrow up" />
              ) : (
                <Icon name="arrow down" />
              )}
            </p>
            <p>Duration</p>
            <p>Task Completion</p>
            <p>Created</p>
            <p onClick={() => this.sortBy('condition')}>
              Condition{' '}
              {this.state.sortBy === 'condition' ? (
                <Icon name="arrow up" />
              ) : (
                <Icon name="arrow down" />
              )}
            </p>
            <p>Actions</p>
            <p>Consent</p>
          </div>
          <ParticipantTable
            studyId={this.props.studyId}
            participants={participants}
            sortBy={this.state.sortBy}
            openParticipant={this.props.openParticipant}
            consents={this.props.consents}
          />
        </StyledParticipantsBoard>
      </div>
    );
  }
}

export default ParticipantsOverview;
