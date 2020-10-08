import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { Select } from 'semantic-ui-react';
import { CONSENTS_QUERY } from '../../../Task/Customize/taskForm';

class EditBasic extends Component {
  render() {
    const { study } = this.props;
    return (
      <div>
        <div>
          <label htmlFor="shortDescription">
            Study description (for researchers only)
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={study.shortDescription}
              onChange={this.props.handleStudyChange}
              rows="10"
            />
          </label>
        </div>
        <span>
          This is for internal use only. Participants won’t see this
          description.
        </span>

        <Query query={CONSENTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading ... </p>;
            const { consents } = data;
            console.log('consents', consents);
            return (
              <div className="consentSelector">
                <p>IRB consent</p>
                <select
                  type="text"
                  id="consent"
                  name="consent"
                  value={study.consent}
                  onChange={this.props.handleStudyChange}
                >
                  <option value="no">Choose the consent form</option>
                  {consents.map(consent => (
                    <option key={consent.id} value={consent.id}>
                      {consent.title}
                    </option>
                  ))}
                </select>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default EditBasic;
