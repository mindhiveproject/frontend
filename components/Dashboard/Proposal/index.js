import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../ErrorMessage/index";
import { USER_DASHBOARD_QUERY } from "../../Queries/User";

import DashboardJournal from "./personalized";

class PersonalDashboard extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {(userPayload) => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayloadError} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return (
            <DashboardJournal
              user={userPayloadData}
              adminMode={this.props.adminMode}
            />
          );
        }}
      </Query>
    );
  }
}

export default PersonalDashboard;
