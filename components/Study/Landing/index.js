import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Link from "next/link";
import Error from "../../ErrorMessage/index";
import StudyWrapper from "./studyWrapper";
import Page from "../../Page/index";

import { CURRENT_USER_RESULTS_QUERY } from "../../Queries/User";
import { STUDY_QUERY } from "../../Queries/Study";

class StudyLanding extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {(userPayload) => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <Query query={STUDY_QUERY} variables={{ slug: this.props.slug }}>
              {(studyPayload) => {
                const studyPayloadError = studyPayload.error;
                const studyPayloadLoading = studyPayload.loading;
                const studyPayloadData =
                  studyPayload.data && studyPayload.data.study;

                if (studyPayloadError)
                  return <Error error={studyPayloadError} />;
                if (studyPayloadLoading) return <p>Loading</p>;
                if (!studyPayloadData)
                  return (
                    <Page>
                      <h1>No study found</h1>
                      <Link
                        href={{
                          pathname: "/",
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
                    inReview={this.props.inReview}
                    guestCode={this.props.code}
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
