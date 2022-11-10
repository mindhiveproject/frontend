import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import { COMPONENTS_QUERY } from '../../../Queries/Component';

import CardWrapper from './cardWrapper';

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
            block =>
              (block?.slug?.includes(search) ||
                block?.title?.includes(search)) &&
              ((createdBy === 'anyone' && block?.public) ||
                (createdBy === 'me' &&
                  (block?.author?.id === user?.id ||
                    block?.collaborators
                      ?.map(collaborator => collaborator?.id)
                      .includes(user?.id))))
          );

          return (
            <div className="blocksMenuContent">
              {filteredBlocks
                .filter(task => componentType.includes(task?.taskType))
                .map(task => (
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
