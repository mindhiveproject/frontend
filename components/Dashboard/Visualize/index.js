import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../ErrorMessage/index";
import { CURRENT_USER_RESULTS_QUERY } from "../../Queries/User";

import DashboardVisualize from "./personalized";

class VisualizeDashboard extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY}>
        {(userPayload) => {
          const userPayloadError = userPayload.error;
          const userPayloadLoading = userPayload.loading;
          const userPayloadData = userPayload.data && userPayload.data.me;
          if (userPayloadError) return <Error error={userPayload.error} />;
          if (userPayloadLoading) return <p>Loading</p>;

          return <DashboardVisualize user={userPayloadData} />;
        }}
      </Query>
    );
  }
}

export default VisualizeDashboard;
