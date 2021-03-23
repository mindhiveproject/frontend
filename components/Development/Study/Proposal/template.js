import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';

import { STUDY_QUERY } from '../builderWrapper';

import ProposalPage from '../../../Dashboard/Proposal/proposalpage';
import { StyledSubmitForm } from '../../../Styles/Forms';

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

class ProposalTemplate extends Component {
  state = {
    isProposal: !!this.props.study?.proposal?.length,
    proposal: this.props.study?.proposal?.length
      ? this.props.study?.proposal[0]
      : null,
    id: '',
    study: this.props.study.id,
  };

  initProposal = () => {
    console.log('init proposal', this.props.study.proposal);
  };

  goBack = () => {
    console.log('go back');
    // create a proposal with a custom mutation
    // send an id of template
    // the id of proposal should return
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  render() {
    if (this.state.isProposal) {
      return (
        <>
          <ProposalPage
            proposal={this.state.proposal}
            goBack={this.goBack}
            hideBackBtn
          />
        </>
      );
    }
    return (
      <Mutation
        mutation={COPY_PROPOSAL_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: STUDY_QUERY,
            variables: {
              id: this.props.study.id,
            },
          },
        ]}
      >
        {(copyProposal, { loading, error }) => (
          <>
            {false && (
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>
            )}

            <StyledSubmitForm
              onSubmit={async e => {
                e.preventDefault();
                const res = await copyProposal();
                console.log('res', res);
                if (res?.data?.copyProposalBoard) {
                  this.setState({
                    proposal: res.data.copyProposalBoard,
                    isProposal: true,
                  });
                }
              }}
            >
              <h1>Create a new study proposal</h1>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  <p>Template ID</p>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={this.state.id}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                {false && (
                  <>
                    <label htmlFor="title">
                      <p>Proposal title</p>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <label htmlFor="description">
                      <p>Description</p>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                  </>
                )}

                <button type="submit">Create</button>
              </fieldset>
            </StyledSubmitForm>
          </>
        )}
      </Mutation>
    );
  }
}

export default ProposalTemplate;
