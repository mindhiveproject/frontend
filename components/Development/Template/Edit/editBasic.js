import React, { Component } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import moment from 'moment';
import SettingsBlock from './settingBlock';

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
    const { template, user } = this.props;

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
      ...template.settings,
    };

    return (
      <StyledBasicPane>
        <label htmlFor="title">
          Template title
          <input
            type="text"
            id="title"
            name="title"
            value={template.title}
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

        <div>
          <label htmlFor="description">
            Template description
            <textarea
              id="description"
              name="description"
              value={template.description}
              onChange={this.props.handleTaskChange}
              rows="5"
            />
          </label>
          <span>This is visible to administrators.</span>
        </div>

        <div>
          <label htmlFor="shortDescription">
            Template short description
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={template.shortDescription}
              onChange={this.props.handleTaskChange}
              rows="5"
            />
          </label>
          <span>This is visible to administrators.</span>
        </div>

        <div>
          <label htmlFor="title">
            lab.js script (JSON file)
            {template?.template?.script ? (
              <div>
                {template?.template?.createdAt && (
                  <div>
                    Created on{' '}
                    {moment(template?.template?.createdAt).format(
                      'MMMM D, YYYY, h:mm'
                    )}
                  </div>
                )}

                {template?.template?.updatedAt && (
                  <div>
                    Last updated on{' '}
                    {moment(template?.template?.updatedAt).format(
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
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
