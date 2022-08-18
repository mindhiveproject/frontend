import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import slugify from 'slugify';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import moment from 'moment';
import SettingsBlock from './settingBlock';
import { CONSENTS_QUERY } from '../../../../Task/Customize/taskForm';

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const StyledSettingBlock = styled.div`
  display: grid;
  grid-gap: 15px;
  margin-bottom: 15px;
`;

const UploadImageContainer = styled.div`
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    background: #f2f2f2;
    padding: 65px 52px 65px 52px;
    margin-bottom: 10px;
  }

  .upload-btn-wrapper-with-image {
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 10px;
  }

  .btn {
    color: white;
    background-color: white;
    padding: 14px 18px;
    border-radius: 4px;
    font-size: 18px;
    background: #b3b3b3;
    border: 2px solid #b3b3b3;
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
  }

  .upload-btn-wrapper input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .upload-btn-wrapper-with-image input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  input {
    height: 100%;
  }
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

    // default settings for each task
    const settings = {
      mobileCompatible: false,
      descriptionBefore: '',
      descriptionAfter: '',
      background: '',
      duration: '',
      scoring: '',
      format: '',
      resources: '[]',
      aggregateVariables: '[]',
      addInfo: '',
      ...task.settings,
    };

    if (taskType === 'Task') delete settings.scoring && delete settings.format;

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

        <label htmlFor="title">
          {taskType} subtitle (to distinguish tasks with the same title)
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={task.subtitle}
            onChange={this.props.handleTaskChange}
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

        {(true || this.props.templateEditor || this.props.adminMode) && (
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

        {(this.props.templateEditor || this.props.adminMode) && (
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

        <div>
          <label>Upload screenshot</label>
          <UploadImageContainer>
            <div
              className={
                task.image
                  ? 'upload-btn-wrapper-with-image'
                  : 'upload-btn-wrapper'
              }
            >
              <button className="btn">
                {task.image
                  ? 'Update task screenshot'
                  : 'Upload task screenshot'}
              </button>
              <input
                type="file"
                id="file"
                name="file"
                value={task.file}
                onChange={e => this.props.uploadImage(e)}
              />
              <div>
                {task.image && (
                  <img width="300" src={task.image} alt="Upload preview" />
                )}
              </div>
            </div>
          </UploadImageContainer>
        </div>
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
