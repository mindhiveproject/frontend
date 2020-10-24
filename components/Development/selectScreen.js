import React, { Component } from 'react';
import styled from 'styled-components';

import ChooseStudyToClone from './Study/chooseToClone';
import StudyBuilderWrapper from './Study/builderWrapper';
import StudyBuilder from './Study/builder';

import ChooseComponentToClone from './Component/chooseToClone';
import ComponentBuilderWrapper from './Component/builderWrapper';
import TaskBuilder from './Component/builder';

const StyledSelectionScreen = styled.div`
  display: grid;
  grid-template-rows: minmax(1px, auto) 1fr;
  height: 100%;
  background: #f7f9f8;

  .selectionHeader {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .goBackBtn {
    cursor: pointer;
    margin: 1rem;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
  }
  .closeBtn {
    width: 3.3rem;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    padding-bottom: 5px;
    font-size: 2rem;
    :hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }

  .selectionBody {
    display: grid;
    justify-content: center;
    align-content: center;
    text-align: center;
  }

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 40px;
  }
  h3 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  p {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 80px;
  }
  .studyOptions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;
  }
  .option {
    max-width: 355px;
  }
  .iconSelect {
    height: 90px;
    display: grid;
    align-items: center;
    justify-content: center;
  }

  .option {
    cursor: pointer;
    padding: 60px 29px 60px 29px;
    :hover {
      background: #ffffff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09),
        0px 5px 6px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      transform: scale(1.05);
      transition: transform 0.5s;
    }
  }
  .selectHeader {
    p {
      text-align: center;
    }
  }
`;

class DevelopmentSelectScreen extends Component {
  state = {
    stage: this.props?.devInfo?.stage || 'selection-first-question',
    choice: this.props?.devInfo?.choice || null,
    action: this.props?.devInfo?.action || null,
    studyIdToClone: this.props?.devInfo?.studyIdToClone || null,
    componentId: this.props?.devInfo?.componentId || null,
  };

  handleTypeChoice = choice =>
    this.setState({ stage: 'selection-second-question', choice });

  handleActionChoice = action =>
    this.setState({ stage: 'development', action });

  returnToStage = stage => this.setState({ stage });

  chooseStudyToClone = study =>
    this.setState({ action: 'create', studyIdToClone: study.id });

  chooseComponentToClone = component => {
    this.setState({
      stage: 'development',
      action: 'create',
      componentId: component.id,
    });
  };

  render() {
    if (this.state.stage === 'selection-first-question') {
      return (
        <StyledSelectionScreen>
          <div className="selectionHeader">
            <div></div>
            <div className="closeBtn">
              <span onClick={this.props.onClose}>&times;</span>
            </div>
          </div>

          <div className="selectionBody">
            <div>
              <h1>What would you like to develop?</h1>
            </div>

            <div className="options">
              <div
                className="option"
                onClick={() => this.handleTypeChoice('study')}
              >
                <div className="iconSelect">
                  <img
                    src="/static/assets/develop-study.svg"
                    alt="icon"
                    width="50"
                  />
                </div>
                <h3>Study</h3>
                <p>
                  A study is a research project with a research question. It can
                  consist of multiple tasks and/or surveys.
                </p>
              </div>
              <div
                className="option"
                onClick={() => this.handleTypeChoice('task')}
              >
                <div className="iconSelect">
                  <img
                    src="/static/assets/develop-task.svg"
                    alt="icon"
                    width="50"
                  />
                </div>
                <h3>Task</h3>
                <p>
                  In a task, participants are asked to perform specific actions
                  (e.g., press a button) based on what they see or hear.
                </p>
              </div>
              <div
                className="option"
                onClick={() => this.handleTypeChoice('survey')}
              >
                <div className="iconSelect">
                  <img
                    src="/static/assets/develop-survey.svg"
                    alt="icon"
                    width="50"
                  />
                </div>
                <h3>Survey</h3>
                <p>
                  In a survey, participants are asked questions about
                  themselves, about how they behave, or about how they feel.
                </p>
              </div>
            </div>
          </div>
        </StyledSelectionScreen>
      );
    }
    if (this.state.stage === 'selection-second-question') {
      if (this.state.choice === 'study') {
        return (
          <StyledSelectionScreen>
            <div className="selectionHeader">
              <div className="goBackBtn">
                <span
                  onClick={() => this.returnToStage('selection-first-question')}
                >
                  ← Go back to previous step
                </span>
              </div>
              <div className="closeBtn">
                <span onClick={this.props.onClose}>&times;</span>
              </div>
            </div>

            <div className="selectionBody">
              <div>
                <h1>Develop a study</h1>
              </div>

              <div className="studyOptions">
                <div
                  className="option"
                  onClick={() => this.handleActionChoice('clone')}
                >
                  <div className="iconSelect">
                    <img
                      src="/static/assets/develop-clone-study.svg"
                      alt="icon"
                      width="50"
                    />
                  </div>
                  <h3>Clone & modify a study</h3>
                  <p>Build a study based on a pre-existing MindHive study.</p>
                </div>
                <div
                  className="option"
                  onClick={() => this.handleActionChoice('create')}
                >
                  <div className="iconSelect">
                    <img
                      src="/static/assets/develop-study-from-scratch.svg"
                      alt="icon"
                      width="50"
                    />
                  </div>
                  <h3>Start a study from scratch</h3>
                  <p>
                    Select this option if you would prefer to build a study from
                    the ground up.
                  </p>
                </div>
              </div>
            </div>
          </StyledSelectionScreen>
        );
      }
      if (this.state.choice === 'task') {
        return (
          <ChooseComponentToClone
            componentType="TASK"
            onReturn={() => this.returnToStage('selection-first-question')}
            onClose={this.props.onClose}
            onChoiceToClone={this.chooseComponentToClone}
            user={this.props.user}
          />
        );
      }
      if (this.state.choice === 'survey') {
        return (
          <StyledSelectionScreen>
            <div className="selectionHeader">
              <div className="goBackBtn">
                <span
                  onClick={() => this.returnToStage('selection-first-question')}
                >
                  ← Go back to previous step
                </span>
              </div>
              <div className="closeBtn">
                <span onClick={this.props.onClose}>&times;</span>
              </div>
            </div>

            <div className="selectionBody">
              <div>
                <h1>Develop a survey</h1>
              </div>

              <div className="studyOptions">
                <div
                  className="option"
                  onClick={() => this.handleActionChoice('clone')}
                >
                  <div className="iconSelect">
                    <img
                      src="/static/assets/develop-clone-survey.svg"
                      alt="icon"
                      width="50"
                    />
                  </div>
                  <h3>Clone & modify a survey</h3>
                  <p>
                    Duplicate and edit a pre-existing MindHive survey and its
                    parameters.
                  </p>
                </div>
                <div
                  className="option"
                  onClick={() => this.handleActionChoice('create')}
                >
                  <div className="iconSelect">
                    <img
                      src="/static/assets/develop-survey-builder.svg"
                      alt="icon"
                      width="50"
                    />
                  </div>
                  <h3>Use the Survey Builder</h3>
                  <p>
                    Select this option if you would prefer to build a survey
                    entirely from scratch.
                  </p>
                </div>
              </div>
            </div>
          </StyledSelectionScreen>
        );
      }
      return <div>To do</div>;
    }
    if (this.state.stage === 'development') {
      if (this.state.choice === 'study') {
        if (this.state.action === 'clone') {
          return (
            <ChooseStudyToClone
              onReturn={() => this.returnToStage('selection-second-question')}
              onClose={this.props.onClose}
              onChoiceToClone={this.chooseStudyToClone}
              user={this.props.user}
            />
          );
        }
        if (this.state.action === 'create') {
          if (this.state.studyIdToClone) {
            console.log('this.state', this.state);
            return (
              <StudyBuilderWrapper
                onLeave={this.props.onClose}
                studyId={this.state.studyIdToClone}
                user={this.props.user}
                needToClone
              />
            );
          }
          return (
            <StudyBuilder
              onLeave={this.props.onClose}
              study={{
                title: `Untitled study - ${Math.floor(Math.random() * 10000)}`,
                description:
                  'Add in a description here to explain your includes Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta lorem id dui volutpat tempor. Praesent luctus porta velit cursus congue. Nullam et faucibus tellus, a tristique elit.',
                settings: {
                  consentObtained: false,
                  guestParticipation: true,
                  proceedToFirstTask: false,
                  zipCode: false,
                  minorsBlocked: false,
                },
                collaborators: [],
                info: [
                  {
                    name: 'what',
                    text:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta lorem id dui volutpat tempor. Praesent luctus porta velit cursus congue. Nullam et faucibus tellus, a tristique elit.',
                  },
                  {
                    name: 'frequency',
                    text: 'Once',
                  },
                  {
                    name: 'time',
                    text: '5 minutes',
                  },
                ],
              }}
              user={this.props.user}
            />
          );
        }
      }
      if (this.state.choice === 'task') {
        if (this.state.componentId) {
          return (
            <ComponentBuilderWrapper
              onLeave={this.props.onClose}
              componentId={this.state.componentId}
              user={this.props.user}
              needToClone
            />
          );
        }
        return (
          <TaskBuilder
            onLeave={this.props.onClose}
            task={{
              title: 'A task - 12942',
              description: 'Provide some description',
              shortDescription: 'Provide some description for researchers',
            }}
            user={this.props.user}
          />
        );
      }
      if (this.state.choice === 'survey') {
        if (this.state.action === 'clone') {
          return (
            <ChooseComponentToClone
              componentType="SURVEY"
              onReturn={() => this.returnToStage('selection-second-question')}
              onClose={this.props.onClose}
              onChoiceToClone={this.chooseComponentToClone}
              user={this.props.user}
            />
          );
        }
        if (this.state.action === 'create') {
          return (
            <ComponentBuilderWrapper
              onLeave={this.props.onClose}
              componentId={
                this.state.componentId || 'ckdps2aw300i60743ge85gtb1'
              }
              user={this.props.user}
              needToClone
            />
          );
        }
      }
      return <div>Development started ... </div>;
    }
    return <div>Null</div>;
  }
}

export default DevelopmentSelectScreen;
export { StyledSelectionScreen };
