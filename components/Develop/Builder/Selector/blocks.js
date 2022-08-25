import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import { COMPONENTS_QUERY } from '../../../Queries/Component';

import Menu from './menu';

class Blocks extends Component {
  render() {
    const { createdBy, search, user } = this.props;

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

          return <Menu {...this.props} blocks={filteredBlocks} />;
        }}
      </Query>
    );
  }
}

export default Blocks;
