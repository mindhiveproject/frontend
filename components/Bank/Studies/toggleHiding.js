import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { MY_DEVELOPED_STUDIES_QUERY } from './developed';

const StyledDeleteBtn = styled.button`
  padding: 5px 5px 5px 5px;
  background: white;
  border: 2px solid red;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;

const TOGGLE_HIDING_STUDY_MUTATION = gql`
  mutation TOGGLE_HIDING_STUDY_MUTATION($id: ID!, $isHidden: Boolean) {
    updateStudy(id: $id, isHidden: $isHidden) {
      id
    }
  }
`;

class ToggleHidingStudy extends Component {
  // update = (cache, payload) => {
  //   // manually update the cache on the client so it matches the server
  //   // 1. read the cache
  //   const data = cache.readQuery({
  //     query: MY_DEVELOPED_STUDIES_QUERY,
  //     variables: { isHidden: this.props.showAllStudies },
  //   });
  //   // 2. Filter the deleted items out of the page
  //   const myStudies = [...data.myStudies].map(study => {
  //     if (study.id === payload.data.updateStudy.id) {
  //       return { ...study, isHidden: !study.isHidden };
  //     }
  //     return study;
  //   });
  //   // 3. Put the items back
  //   cache.writeQuery({
  //     query: MY_DEVELOPED_STUDIES_QUERY,
  //     data: { myStudies },
  //     variables: { isHidden: this.props.showAllStudies },
  //   });
  // };

  render() {
    return (
      <Mutation
        mutation={TOGGLE_HIDING_STUDY_MUTATION}
        variables={{ id: this.props.id, isHidden: this.props.isHidden }}
        // update={this.update}
        refetchQueries={[
          { query: MY_DEVELOPED_STUDIES_QUERY, variables: { isHidden: true } },
          { query: MY_DEVELOPED_STUDIES_QUERY, variables: { isHidden: false } },
        ]}
      >
        {(updateHiddenStatusStudy, { data, loading, error }) => {
          if (loading) {
            return <div>Updating ...</div>;
          }
          return (
            <StyledDeleteBtn
              onClick={() => {
                updateHiddenStatusStudy().catch(err => {
                  alert(err.message);
                });
              }}
            >
              {this.props.children}
            </StyledDeleteBtn>
          );
        }}
      </Mutation>
    );
  }
}

export default ToggleHidingStudy;
