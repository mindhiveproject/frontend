import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import moment from "moment";

import {
  MY_ASSIGNMENTS,
  TEMPLATE_ASSIGNMENTS,
} from "../../../Queries/Assignment";

const StyledSelectionScreen = styled.div`
  display: grid;
  grid-gap: 30px;
  background: #f7f9f8;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr auto;
  align-items: center;
  button {
    min-height: 56px;
    padding: 10px 24px 10px 24px;
    background: #007c70;
    border: 2px solid #007c70;
    box-sizing: border-box;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-family: "Lato";
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  cursor: pointer;
  margin: 0.2rem 0rem;
  padding: 1.5rem 1rem;
  background: white;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
`;

const StyledAssignmentHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  font-weight: bold;
`;

class SelectAssignment extends Component {
  render() {
    return (
      <StyledSelectionScreen>
        <div className="header">
          <div></div>
          <div className="closeBtn">
            <span onClick={this.props.goBack}>&times;</span>
          </div>
        </div>
        <div>
          <p>Create a new assignment or select one from the list below</p>
          <div className="navigationHeader">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
              }}
            >
              <button onClick={() => this.props.addAssignment()}>
                Create a new assignment
              </button>
            </div>
          </div>
        </div>

        <Query query={MY_ASSIGNMENTS} variables={{ id: this.props.user?.id }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { assignments } = data;
            if (!assignments || assignments?.length === 0) return <></>;
            return (
              <div>
                <h2>My assignments</h2>
                <StyledAssignmentHeader>
                  <div>Title</div>
                  <div>Creator</div>
                  <div>Date created</div>
                  <div>Date updated</div>
                </StyledAssignmentHeader>
                <div></div>

                {assignments.map((assignment) => (
                  <StyledWrapper key={assignment.id}>
                    <StyledRow
                      onClick={() => this.props.addAssignment(assignment)}
                    >
                      <div>{assignment?.title}</div>
                      <div>{assignment?.author?.username}</div>
                      <div>
                        {moment(assignment?.createdAt).format("MMMM D, YYYY")}
                      </div>
                      <div>
                        {moment(assignment?.updatedAt).format("MMMM D, YYYY")}
                      </div>
                    </StyledRow>
                    <div>
                      <button
                        onClick={() =>
                          this.props.editAssignment(assignment?.id)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </StyledWrapper>
                ))}
              </div>
            );
          }}
        </Query>

        <Query query={TEMPLATE_ASSIGNMENTS}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { assignments } = data;
            return (
              <div>
                <h2>Template assignments</h2>
                <StyledAssignmentHeader>
                  <div>Title</div>
                  <div>Creator</div>
                  <div>Date created</div>
                  <div>Date updated</div>
                </StyledAssignmentHeader>
                <div></div>

                {assignments.map((assignment) => (
                  <StyledRow
                    key={assignment.id}
                    onClick={() => this.props.addAssignment(assignment)}
                  >
                    <div>{assignment?.title}</div>
                    <div>{assignment?.author?.username}</div>
                    <div>
                      {moment(assignment?.createdAt).format("MMMM D, YYYY")}
                    </div>
                    <div>
                      {moment(assignment?.updatedAt).format("MMMM D, YYYY")}
                    </div>
                  </StyledRow>
                ))}
              </div>
            );
          }}
        </Query>
      </StyledSelectionScreen>
    );
  }
}

export default SelectAssignment;
