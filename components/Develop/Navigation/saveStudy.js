import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";

// query and mutations
import { Dimmer, Loader } from "semantic-ui-react";
import { STUDY_DEVELOPMENT_QUERY } from "../../Queries/Study";

import { CREATE_NEW_STUDY, UPDATE_STUDY } from "../../Mutations/Study";

import { PROPOSAL_BOARD_QUERY_LIGHT } from "../../Queries/Proposal";
import { USER_DASHBOARD_QUERY } from "../../Queries/User";
import { MY_DEVELOPED_STUDIES_QUERY } from "../../Bank/Studies/developed";

import { SaveButton } from "./styles";

class SaveStudy extends Component {
  render() {
    const {
      study,
      isAuthor,
      adminMode,
      needToClone,
      newStudyFromScratch,
      proposalId,
      updateMyStudy,
      createNewStudy,
      buttonTitle,
      callback,
    } = this.props;

    let refetchQueries = {};
    // refetch proposal query if there is one
    if (proposalId) {
      refetchQueries = [
        {
          query: STUDY_DEVELOPMENT_QUERY,
          variables: { id: study.id },
        },
        {
          query: PROPOSAL_BOARD_QUERY_LIGHT,
          variables: { id: proposalId },
        },
      ];
    } else {
      refetchQueries = [
        {
          query: STUDY_DEVELOPMENT_QUERY,
          variables: { id: study.id },
        },
      ];
    }

    return (
      <>
        {(isAuthor || adminMode) && !needToClone && !newStudyFromScratch ? (
          <Mutation mutation={UPDATE_STUDY} refetchQueries={refetchQueries}>
            {(updateStudy, { loading, error }) => {
              if (error) {
                alert(
                  "Oops! this link has already be taken: please pick another."
                );
              }
              if (loading) {
                return (
                  <Dimmer active>
                    <Loader>Saving</Loader>
                  </Dimmer>
                );
              }
              return (
                <SaveButton
                  onClick={() => {
                    if (!loading) {
                      updateMyStudy(updateStudy);
                      if (callback) {
                        callback();
                      }
                    }
                  }}
                >
                  {this.props.children}
                </SaveButton>
              );
            }}
          </Mutation>
        ) : (
          <Mutation
            mutation={CREATE_NEW_STUDY}
            refetchQueries={[
              { query: MY_DEVELOPED_STUDIES_QUERY },
              { query: USER_DASHBOARD_QUERY },
            ]}
          >
            {(createStudy, { loading, error }) => (
              <SaveButton
                onClick={() => {
                  createNewStudy(createStudy);
                  if (callback) {
                    callback();
                  }
                }}
              >
                {this.props.children}
              </SaveButton>
            )}
          </Mutation>
        )}
      </>
    );
  }
}

export default SaveStudy;
