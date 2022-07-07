import React, { Component } from "react";
import { Modal, Icon } from "semantic-ui-react";

import styled from "styled-components";

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 70% auto;
  grid-gap: 20px;
  padding: 50px;
  .symbolBlock {
    background: #F7F9F8;
    padding: 10px;
    max-width: 300px;
    div {
      padding 5px;
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  padding: 50px;
  .rightPanel {
    padding-top: 50px;
    margin-left: 50px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  justify-items: end;
  button {
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    padding: 14px 24px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  .closeBtn {
    background: #ffffff;
    color: #666666;
    border: 2px solid #b3b3b3;
  }
  .addBtn {
    background: #556aeb;
    color: white;
    border-radius: 100px;
    border: 0px;
    margin-bottom: 15px;
  }
  .previewBtn {
    background: #e9ecef;
    color: black;
    border-radius: 100px;
    border: 0px;
  }
`;

class CollaboratorsModal extends Component {
  render() {
    const { component } = this.props;
    console.log({ component });

    return (
      <Modal
        open={open}
        closeOnDimmerClick
        size="large"
        onClose={() => onModalClose()}
      >
        <Modal.Header>
          <StyledHeader>
            <div>
              <h1>Task Name</h1>
              <p>{component?.title}</p>
              <p>
                Task Description/Background: Nulla ex fugiat non tempor ea sit
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
                    Preview task
                  </button>
                </div>
              </StyledButtons>
            </div>
          </StyledHeader>
        </Modal.Header>
        <Modal.Content>
          <StyledContent>
            <div>
              <h2>Parameters</h2>
              <p>The following features of this task can be tweaked:</p>
              <div className="symbolBlock">
                <div>
                  <Icon name="clipboard outline" style={{color:'#556AEB'}}/>
                  Task Instructions
                </div>
                <div>
                  <Icon name="clone outline" style={{color:'#556AEB'}}/>
                  Number of trials
                </div>
                <div>
                  <Icon name="star outline" style={{color:'#556AEB'}}/>
                  Number of points participants start the task with
                </div>
                <div>
                  <Icon name="random" style={{color:'#556AEB'}}/>
                  Whether trials should be randomized
                </div>
                <div>
                  <Icon name="question circle outline" style={{color:'#556AEB'}}/>
                  Which question is asked between trials and how often
                </div>
                <div>
                  <Icon name="question circle outline" style={{color:'#556AEB'}}/>
                  Which question is asked before and after the task
                </div>
              </div>

              <h2>Default Implementation on MindHive</h2>
              <p>Default parameter values (can clone task and modify these)</p>
              <div className="symbolBlock">
                <div>
                  <Icon name="clone outline" style={{color:'#556AEB'}}/>
                  <strong>60 trials</strong>
                </div>
                <div>
                  <Icon name="question circle outline" style={{color:'#556AEB'}}/>
                  Show question every <strong>5 trials</strong>
                </div>
                <div>
                  <Icon name="star outline" style={{color:'#556AEB'}}/>
                  Participants start the task with <strong>500 points</strong>
                </div>
                <div>
                  <Icon name="random" style={{color:'#556AEB'}}/>
                  <strong>Randomized trial sequence</strong> <br /> Note that trials are balanced
                  across the 3 conditions (lose/gain/mixed)
                </div>
              </div>

              <h2>Aggregate Variables</h2>
              <p>
                These data are automatically written to a csv file upon
                completion of the task
              </p>
              <ul>
                <li>variable1</li>
                <li>variable2</li>
                <li>variable3</li>
              </ul>
            </div>
            <div className="rightPanel">
              <h2>Task Screenshot</h2>
              <img />
              <h2>Resources</h2>
              <ul>
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

export default CollaboratorsModal;
