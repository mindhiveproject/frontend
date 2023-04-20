import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../ErrorMessage/index";
import { MY_UPDATES_QUERY } from "../../Queries/Update";

class CountUpdates extends Component {
  render() {
    return (
      <Query query={MY_UPDATES_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <></>;
          if (loading) return <></>;
          if (!data?.myUpdates) return <></>;

          if (data?.myUpdates.length > 0) {
            return (
              <span className="updateCounter">{data?.myUpdates.length}</span>
            );
          }
        }}
      </Query>
    );
  }
}

export default CountUpdates;
