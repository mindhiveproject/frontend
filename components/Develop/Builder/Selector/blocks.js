import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import { COMPONENTS_QUERY } from "../../../Queries/Component";

import CardWrapper from "./cardWrapper";

class Blocks extends Component {
  render() {
    const { createdBy, search, user, componentType } = this.props;

    return (
      <Query query={COMPONENTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { myAndAllTasks } = data;

          const filteredBlocks = myAndAllTasks.filter(
            (block) =>
              block?.title?.toLowerCase().includes(search) &&
              ((createdBy === "anyone" && block?.public) ||
                (createdBy === "me" &&
                  (block?.author?.id === user?.id ||
                    block?.collaborators
                      ?.map((collaborator) => collaborator?.id)
                      .includes(user?.id))) ||
                (createdBy === "favorite" &&
                  user?.favoriteTasks
                    .map((task) => task?.id)
                    .includes(block?.id)))
          );

          const orderedBlocks = filteredBlocks.sort((a, b) => {
            if (
              user?.favoriteTasks.map((task) => task?.id).includes(a?.id) &&
              !user?.favoriteTasks.map((task) => task?.id).includes(b?.id)
            ) {
              return -1;
            }
            if (
              !user?.favoriteTasks.map((task) => task?.id).includes(a?.id) &&
              user?.favoriteTasks.map((task) => task?.id).includes(b?.id)
            ) {
              return 1;
            }
            return 0;
          });

          return (
            <div className="blocksMenuContent">
              {orderedBlocks
                .filter((task) => componentType.includes(task?.taskType))
                .map((task) => (
                  <CardWrapper
                    {...this.props}
                    key={task.id}
                    component={task}
                    redirect="d"
                  />
                ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Blocks;
