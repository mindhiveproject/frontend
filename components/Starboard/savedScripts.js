import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import moment from 'moment';

import { MY_SCRIPTS } from '../Queries/Script';

class SavedScripts extends Component {
  render() {
    return (
      <div className="scriptSelector">
        <Query query={MY_SCRIPTS}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data?.myScripts) return <p>No scripts</p>;
            const scripts = data.myScripts;

            return (
              <div className="savedScripts">
                <div onClick={() => this.props.newScript()} className="link">
                  Create new script
                </div>

                <h2>Scripts</h2>
                <div className="savedScript">
                  <div>Title</div>
                  <div>Description</div>
                  <div>Created</div>
                  <div>Last updated</div>
                </div>
                {scripts.map((script, num) => (
                  <div key={num} className="savedScript">
                    <div
                      onClick={() => this.props.openScript({ script })}
                      className="link"
                    >
                      {script?.title}
                    </div>
                    <div>{script?.description}</div>
                    <div>
                      {moment(script?.createdAt).format('MMMM D, YYYY, h:mma')}
                    </div>
                    <div>
                      {moment(script?.updatedAt).format('MMMM D, YYYY, h:mma')}
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SavedScripts;
