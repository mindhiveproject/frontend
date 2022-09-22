import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Error from '../../ErrorMessage/index';
import { MY_UPDATES_QUERY } from '../../Queries/Update';

import UpdateCard from './updateCard';

class Updates extends Component {
  render() {
    return (
      <Query query={MY_UPDATES_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data?.myUpdates) return <p>No updates found</p>;

          return (
            <div className="updatesBoard">
              <h2>Latest updates</h2>
              <div className="updates">
                {data?.myUpdates.map((update, num) => (
                  <UpdateCard key={num} update={update} />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Updates;
