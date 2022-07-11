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
              <h1>Survey Name</h1>
              <p>{component?.title}</p>
              <p>
                Survey Description/Background: Nulla ex fugiat non tempor ea sit
                veniam sint labore exercitation nostrud nulla. Irure adipisicing
                culpa occaecat ipsum qui est reprehenderit. Elit consequat et
                officia aute non magna velit ex et anim. Veniam magna non
                consequat tempor voluptate elit. Elit Lorem officia sunt quis
                magna quis Lorem ullamco est. Non culpa nostrud excepteur
                commodo enim fugiat non proident duis esse in. Voluptate ex
                ipsum eiusmod nostrud sint.
              </p>
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