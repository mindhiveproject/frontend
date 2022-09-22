import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';

import { StyledButtons, StyledButton } from './styles';

import { CREATE_UPDATE } from '../../../Mutations/Update';
import { UPDATE_HOMEWORK } from '../../../Mutations/Homework';
import { GET_HOMEWORK } from '../../../Queries/Homework';

import Homework from './homework';

class HomeworkModal extends Component {
  state = {
    id: this.props.homework?.id,
    content: this.props.homework?.content,
    settings: this.props.homework?.settings || {
      status: null,
      comment: '',
    },
  };

  handleContentChange = content => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  handleSettingsChange = (name, value) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value,
      },
    });
  };

  render() {
    return (
      <Modal
        open
        closeOnDimmerClick
        size="large"
        onClose={() => this.props.goBack()}
      >
        <Modal.Header>{this.props.assignmentTitle}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Homework
              homework={this.props.homework}
              content={this.state.content}
              settings={this.state.settings}
              onContentChange={this.handleContentChange}
              onSettingsChange={this.handleSettingsChange}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Mutation
            mutation={UPDATE_HOMEWORK}
            variables={this.state}
            refetchQueries={[
              {
                query: GET_HOMEWORK,
                variables: { id: this.props.homework?.id },
              },
            ]}
          >
            {(updateHomework, { loading, error }) => (
              <>
                <Mutation
                  mutation={CREATE_UPDATE}
                  variables={{
                    forUsers: [this.props.homework?.author?.id],
                    updateArea: 'ASSIGNMENT',
                    link: `/dashboard/myclasses/assignments/${this.props.homework?.assignment?.id}`,
                    content: {
                      message: 'The teacher has commented on your assignment',
                    },
                  }}
                >
                  {(createUpdate, { loading, error }) => (
                    <StyledButtons>
                      {!loading && (
                        <StyledButton
                          disabled={loading}
                          className="secondary"
                          onClick={() => this.props.goBack()}
                        >
                          Close without saving
                        </StyledButton>
                      )}
                      <StyledButton
                        className="primary"
                        onClick={() => {
                          updateHomework();
                          createUpdate();
                          this.props.goBack();
                        }}
                        disabled={loading}
                      >
                        {loading ? 'Saving ...' : 'Save & close'}
                      </StyledButton>
                    </StyledButtons>
                  )}
                </Mutation>
              </>
            )}
          </Mutation>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default HomeworkModal;
