import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/client/react/components';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { STUDY_QUERY } from '../builderWrapper';
import { StyledSubmitForm } from '../../../Styles/Forms';

import ProposalPage from './proposalpage';

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
    // console.log('init proposal', this.props.study.proposal);
  };

  goBack = () => {
    // console.log('go back');
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

  onTemplateChange = (event, data) => {
    this.setState({
      id: data.value,
    });
  };

  render() {
    const templates = this.props.templates.map(template => ({
      key: template.id,
      text: template.title,
      value: template.id,
    }));

    if (this.state.isProposal) {
      return <ProposalPage proposal={this.state.proposal} />;
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
                <StyledDropdown>
                  <Dropdown
                    placeholder="Select template"
                    fluid
                    selection
                    options={templates}
                    onChange={this.onTemplateChange}
                    value={this.state.id}
                  />
                </StyledDropdown>
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
