import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

import { PROJECT_QUERY } from '../builderWrapper';
import { StyledSubmitForm } from '../../../Styles/Forms';

const StyledDropdown = styled.div`
  height: 50px;
`;

const COPY_PROPOSAL_MUTATION = gql`
  mutation COPY_PROPOSAL_MUTATION($id: ID!, $study: ID) {
    copyProposalBoard(id: $id, study: $study) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          position
          section {
            id
          }
        }
      }
    }
  }
`;

class CreateProposal extends Component {
  state = {
    id: this.props.isCopy ? this.props.copyProposalId : '',
  };

  onTemplateChange = (event, data) => {
    this.setState({
      id: data.value,
    });
  };

  render() {
    let proposal;
    if (this.props.isCopy) {
      proposal = this.props.study.proposal.filter(
        prop => prop.id === this.props.copyProposalId
      )[0];
    }

    return (
      <Mutation
        mutation={COPY_PROPOSAL_MUTATION}
        refetchQueries={[
          {
            query: PROJECT_QUERY,
            variables: {
              id: this.props.study?.id,
            },
          },
        ]}
      >
        {(copyProposal, { loading, error }) => (
          <>
            <StyledSubmitForm
              onSubmit={async e => {
                e.preventDefault();
                if (!this.state.id) {
                  return alert('Please choose the proposal template');
                }
                const res = await copyProposal({
                  variables: {
                    id: this.state?.id,
                    study: this.props?.study?.id,
                  },
                });
                if (res?.data?.copyProposalBoard) {
                  this.props.goToOverview();
                }
              }}
            >
              <div className="closeBtn">
                <span onClick={this.props.goToOverview}>&times;</span>
              </div>

              <h1>
                {this.props.isCopy
                  ? `Copy the study proposal`
                  : 'Create a new study proposal'}
              </h1>

              <fieldset disabled={loading} aria-busy={loading}>
                {this.props.isCopy ? (
                  <div>
                    <p>
                      Copy the proposal <strong>{proposal?.title}</strong>
                    </p>
                  </div>
                ) : (
                  <StyledDropdown>
                    <Dropdown
                      placeholder="Select template"
                      fluid
                      selection
                      options={this.props.templates}
                      onChange={this.onTemplateChange}
                      value={this.state.id}
                    />
                  </StyledDropdown>
                )}

                <button type="submit">
                  {this.props.isCopy ? 'Create a copy' : 'Create'}
                </button>
              </fieldset>
            </StyledSubmitForm>
          </>
        )}
      </Mutation>
    );
  }
}

export default CreateProposal;
