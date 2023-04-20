import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../ErrorMessage/index";
import TaskPage from "./page";

import { REVIEW_TASK_QUERY_BY_ID } from "../../Queries/Component";

class ReviewTask extends Component {
  render() {
    return (
      <Query query={REVIEW_TASK_QUERY_BY_ID} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.task) return <p>No task found for {this.props.id}</p>;
          const { task } = data;
          return <TaskPage task={task} />;
        }}
      </Query>
    );
  }
}

export default ReviewTask;
