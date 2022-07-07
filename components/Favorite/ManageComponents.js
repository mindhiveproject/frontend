import React, { Component } from 'react';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import Error from '../ErrorMessage/index';

import { CURRENT_USER_RESULTS_QUERY } from '../Queries/User';
import { MY_FAVORITE_TASKS_QUERY } from '../Development/Study/StudyBuilder/Selector/favorite';

const MANAGE_TASK_FAVORITES = gql`
  mutation MANAGE_TASK_FAVORITES($id: ID!, $action: String!) {
    manageFavoriteTasks(id: $id, action: $action) {
      message
    }
  }
`;

const StyledBtn = styled.div`
  cursor: pointer;
`;

class ManageFavoriteComponents extends Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayload.error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          const isFavorite = userPayloadData?.favoriteTasks
            ?.map(task => task?.id)
            .includes(id);

          return (
            <Mutation
              mutation={MANAGE_TASK_FAVORITES}
              variables={{ id, action: isFavorite ? 'disconnect' : 'connect' }}
              refetchQueries={[
                { query: CURRENT_USER_RESULTS_QUERY },
                {
                  query: MY_FAVORITE_TASKS_QUERY,
                  variables: { selector: 'anyone' },
                },
                {
                  query: MY_FAVORITE_TASKS_QUERY,
                  variables: { selector: 'me' },
                },
              ]}
            >
              {(manageTask, { error }) => (
                <StyledBtn
                  onClick={() => {
                    manageTask().catch(err => {
                      alert(err.message);
                    });
                  }}
                >
                  {isFavorite ? (
                    <Icon name="favorite" color="yellow" />
                  ) : (
                    <Icon name="favorite" color="grey" />
                  )}
                </StyledBtn>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default ManageFavoriteComponents;
