import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import { StyledContent, StyledHeader, StyledButtons } from '../styles';
import ExperimentPreview from '../../Task/Preview/index';

class TaskModal extends Component {
  state = {
    showPreview: false,
    size: 'large',
  };

  togglePreview = (e) => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  render() {
    const { component } = this.props;

    return (
      <Modal
        open={open}
        closeOnDimmerClick
        size={this.state.size}
        onClose={() => this.props.onModalClose()}
      >
        <Modal.Header>
          <StyledHeader>
            <div>
              <h1>{component?.title}</h1>
              {/* not all tasks appear to have a description */}
              <p>{component?.description}</p>{' '}
            </div>
            <div className="rightPanel">
              <StyledButtons>
                <div>
                  <button
                    className="addBtn"
                    // onClick={}
                  >
                    Add to study
                  </button>
                </div>
                <div>
                  <button
                    className="previewBtn"
                    onClick={(e) => {
                      this.setState({ size: 'fullscreen' });
                      this.togglePreview(e);
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
              <h2>Parameters</h2>
              <p>The following features of this task can be tweaked:</p>
              <div className="symbolBlock">
                <div>
                  <Icon name="clipboard outline" style={{ color: '#556AEB' }} />
                  Task Instructions
                </div>
                <div>
                  <Icon name="clone outline" style={{ color: '#556AEB' }} />
                  Number of trials
                </div>
                <div>
                  <Icon name="star outline" style={{ color: '#556AEB' }} />
                  Number of points participants start the task with
                </div>
                <div>
                  <Icon name="random" style={{ color: '#556AEB' }} />
                  Whether trials should be randomized
                </div>
                <div>
                  <Icon
                    name="question circle outline"
                    style={{ color: '#556AEB' }}
                  />
                  Which question is asked between trials and how often
                </div>
                <div>
                  <Icon
                    name="question circle outline"
                    style={{ color: '#556AEB' }}
                  />
                  Which question is asked before and after the task
                </div>
              </div>

              <h2>Default Implementation on MindHive</h2>
              <p>Default parameter values (can clone task and modify these)</p>
              <div className="symbolBlock">
                <div>
                  <Icon name="clone outline" style={{ color: '#556AEB' }} />
                  <strong>60 trials</strong>
                </div>
                <div>
                  <Icon
                    name="question circle outline"
                    style={{ color: '#556AEB' }}
                  />
                  Show question every <strong>5 trials</strong>
                </div>
                <div>
                  <Icon name="star outline" style={{ color: '#556AEB' }} />
                  Participants start the task with <strong>500 points</strong>
                </div>
                <div>
                  <Icon name="random" style={{ color: '#556AEB' }} />
                  <strong>Randomized trial sequence</strong> <br /> Note that
                  trials are balanced across the 3 conditions (lose/gain/mixed)
                </div>
              </div>

              <h2>Aggregate Variables</h2>
              <p>
                These data are automatically written to a csv file upon
                completion of the task
              </p>
              <ul className="contentBlock">
                <li>variable1</li>
                <li>variable2</li>
                <li>variable3</li>
              </ul>
            </div>

            <div className="rightPanel">
              <h2>Task Screenshot</h2>
              <img className="contentBlock" />

              <h2>Resources</h2>
              <ul className="contentBlock">
                <li>citation1</li>
                <li>citation2</li>
                <li>citation3</li>
              </ul>
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
        {this.state.showPreview && (
          <ExperimentPreview
            user={this.props?.user?.id || ''}
            parameters={component.parameters}
            template={component.template}
            handleFinish={() =>
              this.setState({ showPreview: false, size: 'large' })
            }
          />
        )}
      </Modal>
    );
  }
}

export default TaskModal;
