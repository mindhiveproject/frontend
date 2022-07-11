import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import { StyledContent, StyledHeader, StyledButtons } from '../styles';

class SurveyModal extends Component {
  render() {
    const { component } = this.props;

    return (
      <Modal
        open={open}
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
                    // onClick={}
                  >
                    Add to study
                  </button>
                </div>
                <div>
                  <button
                    className="previewBtn"
                    // onClick={}
                  >
                    Preview survey
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
              <p>The following features of this survey can be tweaked:</p>
              <div className="symbolBlock">
                <div>
                  <Icon name="clipboard outline" style={{ color: '#556AEB' }} />
                  Survey Instructions
                </div>
                <div>
                  <Icon
                    name="question circle outline"
                    style={{ color: '#556AEB' }}
                  />
                  Which question is asked before and after the survey
                </div>
              </div>

              <h2>Aggregate Variables</h2>
              <p>
                These data are automatically written to a csv file upon
                completion of the survey
              </p>
              <ul className="contentBlock">
                <li>variable1</li>
                <li>variable2</li>
                <li>variable3</li>
              </ul>
            </div>

            <div className="rightPanel">
              <h2>Survey Screenshot</h2>
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
      </Modal>
    );
  }
}

export default SurveyModal;