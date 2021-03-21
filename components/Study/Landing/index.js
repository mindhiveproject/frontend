import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Link from 'next/link';
import Error from '../../ErrorMessage/index';
import StudyWrapper from './studyWrapper';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import Page from '../../Page/index';

const STUDY_QUERY = gql`
  query STUDY_QUERY($slug: String!) {
    study(where: { slug: $slug }) {
      id
      title
      slug
      description
      settings
      tasks {
        id
        title
        description
        link
        settings
        taskType
      }
      image
      largeImage
      info
      collaborators {
        id
        username
      }
      author {
        id
      }
      consent {
        id
        title
        organization
        info
        settings
        studies {
          id
          title
          public
        }
        tasks {
          id
          title
        }
      }
      components
    }
  }
`;

class StudyLanding extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {userPayload => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <Query query={STUDY_QUERY} variables={{ slug: this.props.slug }}>
              {studyPayload => {
                const studyPayloadError = studyPayload.error;
                const studyPayloadLoading = studyPayload.loading;
                const studyPayloadData =
                  studyPayload.data && studyPayload.data.study;
                if (studyPayloadError) return <Error error={error} />;
                if (studyPayloadLoading) return <p>Loading</p>;
                if (!studyPayloadData)
                  return (
                    <Page>
                      <h1>No study found</h1>
                      <Link
                        href={{
                          pathname: '/',
                        }}
                      >
                        <a>
                          <p>Check the list of public studies</p>
                        </a>
                      </Link>
                    </Page>
                  );
                return (
                  <StudyWrapper
                    study={studyPayloadData}
                    user={userPayloadData}
                    onStartTask={this.props.onStartTask}
                    onEndTask={this.props.onEndTask}
                    withoutHeader={this.props.withoutHeader}
                    openedFromDashboard={this.props.openedFromDashboard}
                    task={this.props.c}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default StudyLanding;
export { STUDY_QUERY };
