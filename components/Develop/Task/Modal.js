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
                    onClick={e => {
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
                <>
                  <h2>Background</h2>
                  <p>{settings?.background}</p>
                </>
              )}

              {settings?.researchQuestion && (
                <>
                  <h2>Research question</h2>
                  <p>{settings?.researchQuestion}</p>
                </>
              )}

              {parameters.length > 0 && (
                <>
                  <h2>Parameters</h2>
                  <p>The following features of this task can be tweaked:</p>
                  <div className="symbolBlock">
                    {parameters.map((parameter, num) => (
                      <div key={num}>
                        <Icon
                          name={parameter?.icon || 'clipboard outline'}
                          style={{ color: '#556AEB' }}
                        />
                        {parameter.help}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {parameters.length > 0 && (
                <>
                  <h2>Default Implementation on MindHive</h2>
                  <p>
                    Default parameter values (can clone task and modify these)
                  </p>
                  <div className="symbolBlock">
                    {parameters.map((parameter, num) => (
                      <div key={num}>
                        <Icon
                          name={parameter?.icon || 'clipboard outline'}
                          style={{ color: '#556AEB' }}
                        />
                        {ReactHtmlParser(parameter.value)}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {aggregateVariables.length > 0 && (
                <>
                  <h2>Aggregate Variables</h2>
                  <p>
                    These data are automatically written to a csv file upon
                    completion of the task
                  </p>
                  <ul className="contentBlock">
                    {aggregateVariables.map((variable, num) => (
                      <li key={num}>{ReactHtmlParser(variable)}</li>
                    ))}
                  </ul>
                </>
              )}

              {settings?.descriptionBefore && (
                <>
                  <h2>What participants see before taking the task</h2>
                  <p>{settings?.descriptionBefore}</p>
                </>
              )}

              {settings?.descriptionAfter && (
                <>
                  <h2>What participants see after taking the task</h2>
                  <p>{settings?.descriptionAfter}</p>
                </>
              )}
            </div>

            <div className="rightPanel">
              {component?.image && (
                <>
                  <h2>Task Screenshot</h2>
                  <img className="contentBlock" src={component?.image} />
                </>
              )}

              {settings?.basics && (
                <>
                  <h2>Basics</h2>
                  <p>{settings?.basics}</p>
                </>
              )}

              {settings?.format && (
                <>
                  <h2>Format</h2>
                  <p>{settings?.format}</p>
                </>
              )}

              {settings?.duration && (
                <>
                  <h2>Duration</h2>
                  <p>{settings?.duration}</p>
                </>
              )}

              {resources.length > 0 && (
                <>
                  <h2>Resources</h2>
                  <ul className="contentBlock">
                    {resources.map((resource, num) => (
                      <li key={num}>{ReactHtmlParser(resource)}</li>
                    ))}
                  </ul>
                </>
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
