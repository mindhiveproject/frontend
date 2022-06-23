import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';

// query and mutations
import { STUDY_DEVELOPMENT_QUERY } from '../../Queries/Study';

import { CREATE_NEW_STUDY, UPDATE_STUDY } from '../../Mutations/Study';

import { PROPOSAL_BOARD_QUERY } from '../../Dashboard/Proposal/proposalpage';
import { USER_DASHBOARD_QUERY } from '../../User/index';
import { MY_DEVELOPED_STUDIES_QUERY } from '../../Bank/Studies/developed';

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
          query: PROPOSAL_BOARD_QUERY,
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
                  'Oops! this link has already be taken: please pick another.'
                );
              }
              return (
                <button
                  className="secondaryBtn"
                  onClick={() => {
                    updateMyStudy(updateStudy);
                    if (callback) {
                      callback();
                    }
                  }}
                >
                  {buttonTitle || (loading ? 'Saving' : 'Save')}
                </button>
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
              <button
                className="secondaryBtn"
                onClick={() => {
                  createNewStudy(createStudy);
                  if (callback) {
                    callback();
                  }
                }}
              >
                {buttonTitle || (loading ? 'Saving' : 'Save your study')}
              </button>
            )}
          </Mutation>
        )}
      </>
    );
  }
}

export default SaveStudy;
