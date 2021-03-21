import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';

import TaskCard from './taskcard';

const STUDY_TASKS_QUERY = gql`
  query STUDY_TASKS_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      tasks {
        id
        title
        description
        link
        settings
      }
    }
  }
`;

class StudyPreview extends Component {
  render() {
    return (
      <Query query={STUDY_TASKS_QUERY} variables={{ id: this.props.id }}>
        {studyPayload => {
          const studyPayloadError = studyPayload.error;
          const studyPayloadLoading = studyPayload.loading;
          const studyPayloadData = studyPayload.data && studyPayload.data.study;
          if (studyPayloadError) return <Error error={error} />;
          if (studyPayloadLoading) return <p>Loading</p>;
          if (!studyPayloadData) return <p>No study found</p>;

          if (studyPayloadData.tasks.length) {
            return (
              <div>
                <h1>Preview of {studyPayloadData.title}</h1>
                {studyPayloadData.tasks.map((task, num) => (
                  <TaskCard key={num} task={task} />
                ))}
              </div>
            );
          }
          return <div>No tasks</div>;
        }}
      </Query>
    );
  }
}

export default StudyPreview;
