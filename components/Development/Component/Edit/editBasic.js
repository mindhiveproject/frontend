import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import slugify from 'slugify';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import moment from 'moment';
import SettingsBlock from './settingBlock';
import { CONSENTS_QUERY } from '../../../Task/Customize/taskForm';

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

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
    const { task, user } = this.props;

    const taskType =
      task?.taskType === 'TASK'
        ? 'Task'
        : task?.taskType === 'BLOCK'
        ? 'Block'
        : 'Survey';

    const hasIRBAccess =
      user &&
      user?.permissions &&
      (user.permissions.includes('TEACHER') ||
        user.permissions.includes('SCIENTIST') ||
        user.permissions.includes('ADMIN'));
    const settings = {
      descriptionBefore: '',
      descriptionAfter: '',
      ...task.settings,
    };
    return (
      <StyledBasicPane>
        <label htmlFor="title">
          {taskType} title
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={this.handleTitleChange}
          />
        </label>

        {task?.isExternal && (
          <div style={{ paddingTop: '10px' }}>
            <label htmlFor="link">
              {taskType} link
              <input
                type="text"
                id="link"
                name="link"
                value={task.link || ''}
                onChange={this.props.handleTaskChange}
              />
            </label>
            <span>The data will not be saved to the MH database</span>
          </div>
        )}

        <StyledSettingBlock>
          {Object.keys(settings).map((name, i) => (
            <SettingsBlock
              key={i}
              name={name}
              value={settings[name]}
              onChange={this.props.handleSettingsChange}
              taskType={taskType}
            />
          ))}
        </StyledSettingBlock>

        {this.props.templateEditor && (
          <div>
            <label htmlFor="description">
              {taskType} card description (for Develop mode)
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={this.props.handleTaskChange}
                rows="5"
              />
            </label>
            <span>
              This is visible to researchers, teachers, and students when
              choosing tasks or surveys in the Develop mode.
            </span>
          </div>
        )}

        {this.props.templateEditor && (
          <div>
            <label htmlFor="descriptionForParticipants">
              {taskType} card description (for Discover mode)
              <textarea
                id="descriptionForParticipants"
                name="descriptionForParticipants"
                value={task.descriptionForParticipants}
                onChange={this.props.handleTaskChange}
                rows="5"
              />
            </label>
            <span>
              This is visible to all platform users when choosing tasks or
              surveys in the Discover mode.
            </span>
          </div>
        )}

        {this.props.templateEditor && (
          <div>
            <label htmlFor="title">
              lab.js script (JSON file)
              {task?.template?.script ? (
                <div>
                  {task?.template?.createdAt && (
                    <div>
                      Created on{' '}
                      {moment(task?.template?.createdAt).format(
                        'MMMM D, YYYY, h:mm'
                      )}
                    </div>
                  )}

                  {task?.template?.updatedAt && (
                    <div>
                      Last updated on{' '}
                      {moment(task?.template?.updatedAt).format(
                        'MMMM D, YYYY, h:mm'
                      )}
                    </div>
                  )}

                  <div>
                    <button onClick={this.props.deleteTemplateLocally}>
                      Delete and reupload
                    </button>
                  </div>
                </div>
              ) : (
                <input
                  type="file"
                  id="script"
                  name="script"
                  onChange={this.props.handleScriptUpload}
                  accept=".json"
                  required
                />
              )}
            </label>
          </div>
        )}

        {hasIRBAccess && (
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
        )}
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
