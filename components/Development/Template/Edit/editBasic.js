import React, { Component } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import moment from 'moment';
import lz from 'lzutf8';
import SettingsBlock from './settingBlock';

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 1rem;
  a {
    cursor: pointer;
  }
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

  downloadJSON = async (file, fileName) => {
    console.log(file);
    // create file in browser
    // const fileToOpen = lz.decompress(file);
    const fileToOpen = lz.decompress(lz.decodeBase64(file));
    // const json = JSON.stringify(file, null, 2);
    const blob = new Blob([fileToOpen], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  render() {
    const { template } = this.props;

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
              onChange={this.props.handleTemplateChange}
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
              onChange={this.props.handleTemplateChange}
              rows="5"
            />
          </label>
          <span>This is visible to administrators.</span>
        </div>

        <div>
          <h2>lab.js script (JSON file)</h2>
          {template?.file && (
            <p>
              <a
                onClick={() =>
                  this.downloadJSON(template.file, template?.title)
                }
              >
                Download JSON file
              </a>
            </p>
          )}
          {template?.script ? (
            <div>
              {template?.createdAt && (
                <div>
                  Created on{' '}
                  {moment(template?.template?.createdAt).format(
                    'MMMM D, YYYY, h:mm'
                  )}
                </div>
              )}

              {template?.updatedAt && (
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
        </div>
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
