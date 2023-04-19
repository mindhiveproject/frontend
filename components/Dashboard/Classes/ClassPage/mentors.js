import React, { Component } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { Mutation, Query } from "@apollo/client/react/components";

import uniqid from "uniqid";
import { REVIEW_CLASS_QUERY } from "../classpage";

const REMOVE_MENTOR_FROM_CLASS_MUTATION = gql`
  mutation REMOVE_MENTOR_FROM_CLASS_MUTATION($classId: ID!, $mentorId: ID!) {
    removeMentorFromClass(classId: $classId, mentorId: $mentorId) {
      message
    }
  }
`;

const UPDATE_CLASS_SETTINGS = gql`
  mutation UPDATE_CLASS($id: ID!, $settings: Json) {
    updateClass(id: $id, settings: $settings) {
      id
    }
  }
`;

const StyledMentorsTop = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 20px;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  background: white;
  .copyArea {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    justify-items: baseline;
  }
  .link {
    padding: 12px 16px 12px 17px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .copyButton {
    padding: 12px 25px 12px 25px;
    cursor: pointer;
    color: #007c70;
    border: 2px solid #007c70;
    border-radius: 4px;
    background: white;
    width: 200px;
    text-align: center;
  }
  .infoText {
    margin: 1rem 0rem;
    font-size: 1.2rem;
  }
`;

const StyledMentorHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 50px;
  font-weight: bold;
`;

const StyledMentorRow = styled.div`
  display: grid;
  /* padding: 10px; */
  padding: 1.5rem 1rem;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr 50px;
  background: white;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
  border-radius: 4px;
`;

class ClassMentors extends Component {
  removeFromClass = async (remove, classId, mentorId) => {
    const res = await remove({
      variables: {
        classId,
        mentorId,
      },
    });
  };

  copyLink = (mentorInvitationCode) => {
    const copyLink = `https://mindhive.science/signup/mentor/${this.props.schoolclass.code}/${mentorInvitationCode}`;
    const temp = document.createElement("input");
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand("copy");
    temp.remove();
    alert("The link is copied");
  };

  render() {
    const { mentors } = this.props.schoolclass;
    const mentorInvitationCode = this.props.schoolclass?.settings
      ?.mentorInvitationCode;
    const { isAdmin, isEducationalResearcher } = this.props;

    return (
      <Mutation
        mutation={REMOVE_MENTOR_FROM_CLASS_MUTATION}
        refetchQueries={[
          {
            query: REVIEW_CLASS_QUERY,
            variables: {
              id: this.props.schoolclass.id,
            },
          },
        ]}
      >
        {(removeMentorFromClass, { error }) => (
          <div>
            {!isEducationalResearcher && (
              <StyledMentorsTop>
                {mentorInvitationCode && (
                  <div>
                    <p>
                      Share the link below with mentors to invite them to join
                      your class
                    </p>
                    <div className="copyArea">
                      <div className="link">
                        https://mindhive.science/signup/mentor/
                        {this.props.schoolclass.code}/{mentorInvitationCode}
                      </div>
                      <div
                        className="copyButton"
                        onClick={() => this.copyLink(mentorInvitationCode)}
                      >
                        Copy
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  {mentorInvitationCode ? (
                    <div className="infoText">
                      ⚠️ Creating a new link will invalidate the current one
                    </div>
                  ) : (
                    <div className="infoText">
                      👋 Create a new invitation link for mentors to join your
                      class
                    </div>
                  )}
                  <Mutation
                    mutation={UPDATE_CLASS_SETTINGS}
                    refetchQueries={[
                      {
                        query: REVIEW_CLASS_QUERY,
                        variables: {
                          id: this.props.schoolclass.id,
                        },
                      },
                    ]}
                  >
                    {(updateClassSettings, { loading, error }) => (
                      <button
                        className="copyButton"
                        onClick={async () => {
                          const res = await updateClassSettings({
                            variables: {
                              id: this.props.schoolclass.id,
                              settings: {
                                ...this.props.schoolclass?.settings,
                                mentorInvitationCode: uniqid.time(),
                              },
                            },
                          });
                        }}
                      >
                        {loading ? "Creating ..." : "Create link"}
                      </button>
                    )}
                  </Mutation>
                </div>
              </StyledMentorsTop>
            )}

            <StyledMentorHeader>
              <div>Mentor/Username</div>
              {!isEducationalResearcher && <div>Email address</div>}
              {!isEducationalResearcher && <div>Actions</div>}
            </StyledMentorHeader>

            {mentors.map((mentor, i) => {
              const email =
                (mentor.authEmail.length && mentor.authEmail[0].email) || "";
              return (
                <StyledMentorRow key={i}>
                  {isEducationalResearcher ? (
                    <div>{mentor.username}</div>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => this.props.openStudentPage(mentor.id)}
                    >
                      {mentor.username}
                    </div>
                  )}
                  {!isEducationalResearcher && <div>{email}</div>}
                  {!isEducationalResearcher && (
                    <Dropdown text="...">
                      <Dropdown.Menu>
                        <Dropdown.Item
                          name="remove"
                          onClick={() =>
                            this.removeFromClass(
                              removeMentorFromClass,
                              this.props.schoolclass.id,
                              mentor.id
                            )
                          }
                        >
                          Remove from this class
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </StyledMentorRow>
              );
            })}
          </div>
        )}
      </Mutation>
    );
  }
}

export default ClassMentors;
