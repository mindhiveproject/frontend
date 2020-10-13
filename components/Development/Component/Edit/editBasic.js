import React, { Component } from 'react';
import { Query } from 'react-apollo';
import slugify from 'slugify';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import SettingsBlock from './settingBlock';

import { CONSENTS_QUERY } from '../../../Task/Customize/taskForm';

const StyledSettingBlock = styled.div`
  display: grid;
  grid-gap: 15px;
  margin-bottom: 15px;
`;

class EditBasic extends Component {
  handleTitleChange = e => {
    const slug = slugify(e.target.value, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
    });
    this.props.handleSetMultipleValuesInState({
      title: e.target.value,
      slug,
    });
  };

  render() {
    const { task } = this.props;
    const settings = task.settings || {};
    return (
      <div>
        <label htmlFor="title">
          Task title
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={this.handleTitleChange}
          />
        </label>

        <StyledSettingBlock>
          {Object.keys(settings).map((name, i) => (
            <SettingsBlock
              key={i}
              name={name}
              value={settings[name]}
              onChange={this.props.handleSettingsChange}
            />
          ))}
        </StyledSettingBlock>

        <label htmlFor="description">
          Task card description (for Develop mode)
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={this.props.handleTaskChange}
            rows="5"
          />
        </label>
        <span>
          This is visible to researchers, teachers, and students when choosing
          tasks or surveys in the Develop mode.
        </span>

        <Query query={CONSENTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading ... </p>;
            const { consents } = data;
            return (
              <div className="consentSelector">
                <p>IRB consent</p>
                <select
                  type="text"
                  id="consent"
                  name="consent"
                  value={task.consent}
                  onChange={this.props.handleTaskChange}
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
