import React, { Component } from "react";

import styled from "styled-components";

import { Mutation } from "@apollo/client/react/components";
import { UPDATE_PROPOSAL_BOARD } from "../../../Mutations/Proposal";

const StyledProposalHeader = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 10px;
  input,
  textarea,
  select {
    background: #f6f9f8;
    width: 100%;
    border: 0px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: #007c70;
    color: white;
    max-width: 256px;
    border-radius: 3px;
    cursor: pointer;
  }
  .title {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 23px;
  }
  .description {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
  .checkboxField {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 10px;
    align-items: center;
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      color: green;
    }
  }
`;

class ProposalHeader extends Component {
  state = {
    id: this.props.proposal.id,
    title: this.props.proposal.title,
    description: this.props.proposal.description,
    isTemplate: this.props.proposal.isTemplate,
    isSubmitted: this.props.proposal.isSubmitted,
    settings: this.props.proposal.settings || {
      allowMovingSections: true,
      allowMovingCards: true,
      allowAddingSections: true,
      allowAddingCards: true,
    },
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  toggleState = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  toggleSettings = (e) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [e.target.name]: !this.state?.settings?.[e.target.name],
      },
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Mutation mutation={UPDATE_PROPOSAL_BOARD} variables={this.state}>
        {(updateProposal, { loading, error }) => {
          if (error) {
            alert(
              "Oops! this title has already be taken: please pick another."
            );
          }
          return (
            <StyledProposalHeader>
              <div>
                <div>
                  <label htmlFor="title">
                    <input
                      type="text"
                      id="propsalTitle"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                      className="title"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="description">
                    <textarea
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      rows="1"
                      className="description"
                    />
                  </label>
                </div>

                {this.props.proposalBuildMode && (
                  <div>
                    {user?.permissions.includes("ADMIN") && (
                      <>
                        <div>
                          <label htmlFor="isTemplate">
                            <div className="checkboxField">
                              <input
                                type="checkbox"
                                id="isTemplate"
                                name="isTemplate"
                                checked={this.state.isTemplate}
                                onChange={this.toggleState}
                              />
                              <span>Public template</span>
                            </div>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="isSubmitted">
                            <div className="checkboxField">
                              <input
                                type="checkbox"
                                id="isSubmitted"
                                name="isSubmitted"
                                checked={this.state.isSubmitted}
                                onChange={this.toggleState}
                              />
                              <span>Is submitted</span>
                            </div>
                          </label>
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="allowMovingSections">
                        <div className="checkboxField">
                          <input
                            type="checkbox"
                            id="allowMovingSections"
                            name="allowMovingSections"
                            checked={this.state?.settings?.allowMovingSections}
                            onChange={this.toggleSettings}
                          />
                          <span>Allow moving sections</span>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label htmlFor="allowMovingCards">
                        <div className="checkboxField">
                          <input
                            type="checkbox"
                            id="allowMovingCards"
                            name="allowMovingCards"
                            checked={this.state?.settings?.allowMovingCards}
                            onChange={this.toggleSettings}
                          />
                          <span>Allow moving cards</span>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label htmlFor="allowAddingSections">
                        <div className="checkboxField">
                          <input
                            type="checkbox"
                            id="allowAddingSections"
                            name="allowAddingSections"
                            checked={this.state?.settings?.allowAddingSections}
                            onChange={this.toggleSettings}
                          />
                          <span>Allow adding new sections</span>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label htmlFor="allowAddingCards">
                        <div className="checkboxField">
                          <input
                            type="checkbox"
                            id="allowAddingCards"
                            name="allowAddingCards"
                            checked={this.state?.settings?.allowAddingCards}
                            onChange={this.toggleSettings}
                          />
                          <span>Allow adding new cards</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {(this.state.title !== this.props.proposal?.title ||
                  this.state.description !== this.props.proposal?.description ||
                  this.state.isTemplate !== this.props.proposal?.isTemplate ||
                  this.state.settings !== this.props.proposal?.settings ||
                  this.state.isSubmitted !==
                    this.props.proposal?.isSubmitted) && (
                  <div>
                    <button
                      className="secondaryBtn"
                      onClick={async () => {
                        const res = await updateProposal();
                      }}
                    >
                      {loading ? "Saving" : "Save"}
                    </button>
                  </div>
                )}
              </div>
            </StyledProposalHeader>
          );
        }}
      </Mutation>
    );
  }
}

export default ProposalHeader;
