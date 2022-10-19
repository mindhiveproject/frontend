import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { Dropdown } from 'semantic-ui-react';

import { STUDY_DEVELOPMENT_QUERY } from '../../Queries/Study';
import { COPY_PROPOSAL_MUTATION } from '../../Queries/Proposal';
import { StyledSubmitForm } from '../../Styles/Forms';

import { StyledDropdown } from './styles';
import { StyledDasboard } from '../../Dashboard/styles';

import ProposalPDF from '../../Proposal/pdf';

class CreateProposal extends Component {
  state = {
    id: this.props.isCopy ? this.props.copyProposalId : '',
    selectedTemplate: this.props.isCopy ? this.props.copyProposal : null,
  };

  onTemplateChange = (event, data) => {
    this.setState({
      id: data.value,
      selectedTemplate: this.props.templates.filter(
        t => t?.id == data.value
      )[0],
    });
  };

  render() {
    let proposal;
    if (this.props.isCopy) {
      proposal = this.props.study.proposal.filter(
        prop => prop.id === this.props.copyProposalId
      )[0];
    }

    const dropdownTemplates = this.props.templates.map(template => ({
      key: template.id,
      text: template.title,
      value: template.id,
    }));

    return (
      <StyledDasboard>
        <Mutation
          mutation={COPY_PROPOSAL_MUTATION}
          refetchQueries={[
            {
              query: STUDY_DEVELOPMENT_QUERY,
              variables: {
                id: this.props.study?.id,
              },
            },
          ]}
        >
          {(copyProposal, { loading, error }) => (
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
                      options={dropdownTemplates}
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
          )}
        </Mutation>
        <>
          {this.state?.selectedTemplate && !this.props.isCopy && (
            <StyledDasboard>
              <h2>Proposal preview</h2>
              <p>{this.state?.selectedTemplate?.description}</p>
              <ProposalPDF proposal={this.state?.selectedTemplate} />
            </StyledDasboard>
          )}
        </>
      </StyledDasboard>
    );
  }
}

export default CreateProposal;
