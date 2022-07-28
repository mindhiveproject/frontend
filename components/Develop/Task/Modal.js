import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import ReactHtmlParser from 'react-html-parser';
import { StyledContent, StyledHeader, StyledButtons } from '../styles';

class TaskModal extends Component {
  render() {
    // get the data
    const component = this.props?.component || {};
    const settings = component?.settings || {};
    const resources =
      (settings?.resources && JSON.parse(settings?.resources)) || [];
    const aggregateVariables =
      (settings?.aggregateVariables &&
        JSON.parse(settings?.aggregateVariables)) ||
      [];
    const parameters = component?.parameters || [];

    return (
      <Modal
        open
        closeOnDimmerClick
        size="large"
        onClose={() => this.props.onModalClose()}
      >
        <Modal.Header>
          <StyledHeader>
            <div>
              <h1>{component?.title}</h1>
              <p>{component?.description}</p>
            </div>
            <div className="rightPanel">
              <StyledButtons>
                <div>
                  <button
                    className="addBtn"
                    onClick={() => {
                      this.props.addComponentToCanvas({
                        name: component?.title,
                        details: component?.description,
                        componentID: component?.id,
                      });
                      this.props.onModalClose();
                    }}
                  >
                    Add to study
                  </button>
                </div>
                <div>
                  <button
                    className="previewBtn"
                    onClick={(e) => {
                      this.props.onModalClose();
                      this.props.onShowPreview(e, true);
                    }}
                  >
                    Preview task
                  </button>
                </div>
              </StyledButtons>
            </div>
          </StyledHeader>
        </Modal.Header>
        <Modal.Content style={{ padding: '0px', backgroundColor: '#E6E6E6' }}>
          <StyledContent>
            <div className="leftPanel">
              {settings?.background && (
                <div className="contentBlock">
                  <h2>Background</h2>
                  <div>
                    {settings?.researchQuestion && (
                      <p>
                        <strong>{settings?.researchQuestion}</strong>
                      </p>
                    )}
                    {settings?.background && <p>{settings?.background}</p>}
                  </div>
                </div>
              )}

              {parameters.length > 0 && (
                <div>
                  <h2>Parameters</h2>
                  <p>The following features of this task can be tweaked:</p>
                  <p style={{ fontSize: '14px' }}>
                    * Default values are shown (can clone task and modify these)
                  </p>
                  <div className="symbolBlock">
                    {parameters.map((parameter, num) => (
                      <div style={{ padding: '5px' }} key={num}>
                        <p>
                          <Icon
                            name={parameter?.icon || 'clipboard outline'}
                            style={{ color: '#556AEB' }}
                          />
                          <span style={{ fontWeight: '600' }}>
                            {parameter.help}
                          </span>
                        </p>
                        <p style={{ fontWeight: 'lighter' }}>
                          {ReactHtmlParser(parameter.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aggregateVariables.length > 0 && (
                <div className="contentBlock">
                  <h2>Aggregate Variables</h2>
                  <p>
                    These data are automatically written to a csv file upon
                    completion of the task
                  </p>
                  <ul>
                    {aggregateVariables.map((variable, num) => (
                      <li key={num}>{ReactHtmlParser(variable)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {settings?.descriptionBefore && (
                <div>
                  <h2>
                    What participants see <u>before</u> taking the task
                  </h2>
                  <p className="symbolBlock">{settings?.descriptionBefore}</p>
                </div>
              )}

              {settings?.descriptionAfter && (
                <div>
                  <h2>
                    What participants see <u>after</u> taking the task
                  </h2>
                  <p className="symbolBlock">{settings?.descriptionAfter}</p>
                </div>
              )}
            </div>

            <div className="rightPanel">
              {component?.image && (
                <div className="contentBlock">
                  <h2>Task Screenshot</h2>
                  <img src={component?.image} />
                </div>
              )}

              {settings?.format && (
                <div className="contentBlock">
                  <h2>Format</h2>
                  <p>{settings?.format}</p>
                </div>
              )}

              {settings?.duration && (
                <div className="contentBlock">
                  <h2>Duration</h2>
                  <p>{settings?.duration}</p>
                </div>
              )}

              {resources.length > 0 && (
                <div className="contentBlock">
                  <h2>Resources</h2>
                  <ul>
                    {resources.map((resource, num) => (
                      <li key={num}>{ReactHtmlParser(resource)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </StyledContent>
        </Modal.Content>
        <Modal.Actions>
          <StyledButtons>
            <button
              className="closeBtn"
              onClick={() => this.props.onModalClose()}
            >
              Close
            </button>
          </StyledButtons>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TaskModal;
