import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import { TASK_QUERY } from "../../Task/Run/index";
import TestManager from "../TestManager";
import Error from "../../ErrorMessage/index";

const StyledLinkWindow = styled.div`
  height: 90vh;
  padding: 2rem;
  display: grid;
  justify-items: center;
  align-content: center;
  line-height: 3rem;
  font-family: Lato;
  font-size: 1.5rem;
  font-weight: 400;
  color: #666666;
  button {
    height: 100%;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: 0.05em;
    color: #007c70;
    border: 2px solid #007c70;
    cursor: pointer;
    border-radius: 4px;
    padding: 1rem 3rem;
    background: none;
  }
`;

// get the information about the current test
class TestWrapper extends Component {
  onNext = () => {
    if (this.props.guest) {
      window.location = `/studies/${this.props.study.slug}?code=${this.props.guest?.publicId}`;
    } else {
      window.location = `/studies/${this.props.study.slug}`;
    }
  };

  render() {
    return (
      <Query query={TASK_QUERY} variables={{ id: this.props.t }}>
        {(testPayload) => {
          const testPayloadError = testPayload.error;
          const testPayloadLoading = testPayload.loading;
          const testPayloadData = testPayload.data && testPayload.data.task;
          if (testPayloadError) return <Error error={testPayloadError} />;
          if (testPayloadLoading) return <p>Loading</p>;

          const participant = this.props.guest || this.props.user;
          const { publicId } = participant;
          const { link } = testPayloadData;
          let extendedLink;
          if (link) {
            if (link.split("/")[link.split("/").length - 1].startsWith("?")) {
              extendedLink = `${link}&mhp=${publicId}`;
            } else {
              extendedLink = `${link}?mhp=${publicId}`;
            }
          }

          if (testPayloadData.isExternal && testPayloadData.link) {
            return (
              <StyledLinkWindow>
                Please click the link below to participate in the{" "}
                {testPayloadData.taskType.toLowerCase()} (the link opens in a
                new tab){" "}
                <a href={extendedLink} target="_blank" rel="noreferrer">
                  <strong>{testPayloadData.title}</strong>
                </a>
                <p>
                  After completing the task, return to this page and click the
                  button below.
                </p>
                <button onClick={() => this.onNext()}>
                  I am done with the task, continue.
                </button>
              </StyledLinkWindow>
            );
          }

          return (
            <TestManager
              user={this.props.user}
              study={this.props.study}
              test={testPayloadData}
              version={this.props.v}
              guest={this.props.guest}
            />
          );
        }}
      </Query>
    );
  }
}

export default TestWrapper;
