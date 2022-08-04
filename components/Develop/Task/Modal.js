import React, { Component } from 'react';
import { Modal, Icon, Accordion } from 'semantic-ui-react';

import ReactHtmlParser from 'react-html-parser';
import { StyledContent, StyledHeader, StyledButtons } from '../styles';

class TaskModal extends Component {
  state = { active: false };

  handleClick = e => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  render() {
    // get the data
    const { active } = this.state;
    const component = this.props?.component || {};

    const taskType =
      component?.taskType === 'TASK'
        ? 'task'
        : component?.taskType === 'BLOCK'
        ? 'block'
        : 'survey';
    const settings = component?.settings || {};
    const resources =
      (settings?.resources && JSON.parse(settings?.resources)) || [];
    const aggregateVariables =
      (settings?.aggregateVariables &&
        JSON.parse(settings?.aggregateVariables)) ||
      [];

    // parameters not from the survey builder
    const parameters =
      component?.parameters.filter(p => p?.type !== 'survey') || [];

    // parameters from the survey builder
    const surveyItems =
      component?.parameters
        .filter(param => param?.type === 'survey')
        .map(param => JSON.parse(param?.value))
        .flat()
        .map(page => page?.page)
        .flat() || [];

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
                    Preview {taskType}
                  </button>
                </div>
              </StyledButtons>
            </div>
          </StyledHeader>
        </Modal.Header>
        <Modal.Content style={{ padding: '0px', backgroundColor: '#E6E6E6' }}>
          <StyledContent>
            <div className="leftPanel">
              {component?.image && (
                <div className="contentBlock">
                  <h2>Task Screenshot</h2>
                  <img src={component?.image} />
                </div>
              )}

              {settings?.background && (
                <div className="contentBlock">
                  <h2>Background</h2>
                  <div>
                    {settings?.researchQuestion && (
                      <p>
                        <strong>{settings?.researchQuestion}</strong>
                      </p>
                    )}
                    {settings?.background && (
                      <p>{ReactHtmlParser(settings?.background)}</p>
                    )}
                  </div>
                </div>
              )}

              {parameters.length > 0 && (
                <div>
                  <h2>Parameters</h2>
                  <p>
                    The following features of this {taskType} can be tweaked:
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    * Default values are shown (can clone {taskType} and modify
                    these)
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

              {surveyItems.length > 0 && (
                <div>
                  <h2>Survey parameters</h2>
                  <p>
                    The following features of this {taskType} can be tweaked:
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    * Default values are shown (can clone {taskType} and modify
                    these)
                  </p>
                  <div className="symbolBlock">
                    {surveyItems.map((item, num) => (
                      <div style={{ padding: '5px' }} key={num}>
                        <p>
                          <Icon
                            name={item?.icon || 'clipboard outline'}
                            style={{ color: '#556AEB' }}
                          />
                          <span style={{ fontWeight: '600' }}>
                            {item?.type === 'text' && 'Text'}
                            {item?.type === 'vas' && 'Visual analogue scale'}
                            {item?.type === 'likert' && 'Likert scale'}
                            {item?.type === 'freeinput' && 'Free text input'}
                            {item?.type === 'select' && 'Select one'}
                            {item?.type === 'checkbox' && 'Select many'}
                          </span>
                        </p>
                        <p style={{ fontWeight: 'lighter' }}>
                          {ReactHtmlParser(item?.header)}
                        </p>
                        <p style={{ fontWeight: 'lighter' }}>
                          {ReactHtmlParser(item?.text)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settings?.descriptionBefore && (
                <div>
                  <h2>
                    What participants see <u>before</u> taking the {taskType}
                  </h2>
                  <p className="symbolBlock">{settings?.descriptionBefore}</p>
                </div>
              )}

              {settings?.descriptionAfter && (
                <div>
                  <h2>
                    What participants see <u>after</u> taking the {taskType}
                  </h2>
                  <p className="symbolBlock">{settings?.descriptionAfter}</p>
                </div>
              )}
            </div>

            <div className="rightPanel">
              {aggregateVariables.length > 0 && (
                <div className="contentBlock">
                  <h2>Aggregate Variables</h2>
                  <p>
                    These data are automatically written to a csv file upon
                    completion of the {taskType}
                  </p>
                  {settings?.addInfo && (
                    <Accordion>
                      <Accordion.Title
                        active={active}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" />
                        more info
                      </Accordion.Title>
                      <Accordion.Content active={active}>
                        <p>{ReactHtmlParser(settings?.addInfo)}</p>
                      </Accordion.Content>
                    </Accordion>
                  )}
                  <ul>
                    {aggregateVariables.map((variable, num) => (
                      <li key={num}>{ReactHtmlParser(variable)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {settings?.scoring && (
                <div className="contentBlock">
                  <h2>Scoring</h2>
                  <p>{settings?.scoring}</p>
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
