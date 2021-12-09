import React, { Component } from 'react';
import styled from 'styled-components';

import ChooseStudyToClone from './Study/chooseToClone';
import StudyBuilderWrapper from './Study/builderWrapper';
import StudyBuilder from './Study/builder';

import ChooseComponentToClone from './Component/chooseToClone';
import ComponentBuilderWrapper from './Component/builderWrapper';
import ComponentBuilder from './Component/builder';

import { StyledSelectionScreen } from './styles';
import ActionSelector from './actionSelector';

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
              <div
                className="option"
                onClick={() => this.handleTypeChoice('block')}
              >
                <div className="iconSelect">
                  <img
                    src="/static/assets/develop-study-from-scratch.svg"
                    alt="icon"
                    width="50"
                  />
                </div>
                <h3>Block</h3>
                <p>In a block, participants are presented with information.</p>
              </div>
            </div>
          </div>
        </StyledSelectionScreen>
      );
    }
    if (this.state.stage === 'selection-second-question') {
      if (this.state.choice === 'study') {
        return (
          <ActionSelector
            returnToStage={this.returnToStage}
            onClose={this.props.onClose}
            handleActionChoice={this.handleActionChoice}
            title="Develop a study"
            options={[
              {
                header: 'Clone & modify a study',
                description:
                  'Build a study based on a pre-existing MindHive study.',
                icon: '/static/assets/develop-clone-study.svg',
                action: 'clone',
              },
              {
                header: 'Start a study from scratch',
                description:
                  'Select this option if you would prefer to build a study from the ground up.',
                icon: '/static/assets/develop-study-from-scratch.svg',
                action: 'create',
              },
            ]}
          />
        );
      }
      if (this.state.choice === 'task') {
        return (
          <ActionSelector
            returnToStage={this.returnToStage}
            onClose={this.props.onClose}
            handleActionChoice={this.handleActionChoice}
            title="Develop a task"
            options={[
              {
                header: 'Clone & modify a task',
                description:
                  'Build a task based on a pre-existing MindHive task.',
                icon: '/static/assets/develop-clone-study.svg',
                action: 'clone',
              },
              {
                header: 'Upload a task from lab.js',
                description:
                  'Select this option if you would prefer to upload your own task script from lab.js.',
                icon: '/static/assets/develop-study-from-scratch.svg',
                action: 'upload',
              },
              {
                header: 'Add an external task with a web link',
                description:
                  'Select this option if you would prefer to add an external link',
                icon: '/static/assets/develop-task.svg',
                action: 'link',
              },
            ]}
          />
        );
      }
      if (this.state.choice === 'survey') {
        return (
          <ActionSelector
            returnToStage={this.returnToStage}
            onClose={this.props.onClose}
            handleActionChoice={this.handleActionChoice}
            title="Develop a survey"
            options={[
              {
                header: 'Clone & modify a survey',
                description:
                  'Duplicate and edit a pre-existing MindHive survey and its parameters.',
                icon: '/static/assets/develop-clone-survey.svg',
                action: 'clone',
              },
              {
                header: 'Use the Survey Builder',
                description:
                  'Select this option if you would prefer to build a survey entirely from scratch.',
                icon: '/static/assets/develop-survey-builder.svg',
                action: 'create',
              },
              {
                header: 'Upload a survey from lab.js',
                description:
                  'Select this option if you would prefer to upload your own survey script from lab.js.',
                icon: '/static/assets/develop-study-from-scratch.svg',
                action: 'upload',
              },
              {
                header: 'Add an external survey with a web link',
                description:
                  'Select this option if you would prefer to add an external link',
                icon: '/static/assets/develop-task.svg',
                action: 'link',
              },
            ]}
          />
        );
      }
      if (this.state.choice === 'block') {
        return (
          <ChooseComponentToClone
            componentType="BLOCK"
            onReturn={() => this.returnToStage('selection-first-question')}
            onClose={this.props.onClose}
            onChoiceToClone={this.chooseComponentToClone}
            user={this.props.user}
          />
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
                description: 'Add in a description here',
                settings: {
                  consentObtained: false,
                  guestParticipation: true,
                  proceedToFirstTask: false,
                  zipCode: false,
                  sonaId: false,
                  minorsBlocked: false,
                  forbidRetake: false,
                  hideParticipateButton: false,
                  showEmailNotificationPropmt: false,
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
        if (this.state.action === 'clone') {
          return (
            <ChooseComponentToClone
              componentType="TASK"
              onReturn={() => this.returnToStage('selection-second-question')}
              onClose={this.props.onClose}
              onChoiceToClone={this.chooseComponentToClone}
              user={this.props.user}
            />
          );
        }

        if (this.state.action === 'create') {
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
          return <div>No task to clone</div>;
        }

        if (this.state.action === 'upload') {
          return (
            <ComponentBuilder
              onLeave={this.props.onClose}
              task={{
                title: `Untitled task - ${Math.floor(Math.random() * 10000)}`,
                subtitle: '',
                description: 'Add in a description here',
                shortDescription:
                  'Add in a description for researchers (short description)',
                taskType: 'TASK',
                isOriginal: true,
              }}
              user={this.props.user}
              templateEditor
            />
          );
        }

        if (this.state.action === 'link') {
          return (
            <ComponentBuilder
              onLeave={this.props.onClose}
              task={{
                title: `Untitled task - ${Math.floor(Math.random() * 10000)}`,
                subtitle: '',
                description: 'Add in a description here',
                shortDescription:
                  'Add in a description for researchers (short description)',
                taskType: 'TASK',
                isOriginal: true,
                isExternal: true,
              }}
              user={this.props.user}
            />
          );
        }
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
        // there are different ids of the survey builder for the development and production
        if (this.state.action === 'create') {
          return (
            <ComponentBuilderWrapper
              onLeave={this.props.onClose}
              componentId={
                this.state.componentId ||
                (process.env.NODE_ENV === 'production'
                  ? 'ckdps2aw300i60743ge85gtb1'
                  : 'ckpnqxnnrs67p0913xt74kdun')
              }
              user={this.props.user}
              needToClone
            />
          );
        }
        if (this.state.action === 'upload') {
          return (
            <ComponentBuilder
              onLeave={this.props.onClose}
              task={{
                title: `Untitled survey - ${Math.floor(Math.random() * 10000)}`,
                subtitle: '',
                description: 'Add in a description here',
                shortDescription:
                  'Add in a description for researchers (short description)',
                taskType: 'SURVEY',
                isOriginal: true,
              }}
              user={this.props.user}
              templateEditor
            />
          );
        }
        if (this.state.action === 'link') {
          return (
            <ComponentBuilder
              onLeave={this.props.onClose}
              task={{
                title: `Untitled survey - ${Math.floor(Math.random() * 10000)}`,
                subtitle: '',
                description: 'Add in a description here',
                shortDescription:
                  'Add in a description for researchers (short description)',
                taskType: 'SURVEY',
                isOriginal: true,
                isExternal: true,
              }}
              user={this.props.user}
            />
          );
        }
      }
      if (this.state.choice === 'block') {
        if (this.state.action === 'create') {
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
        }
      }
      return <div>Development started ... </div>;
    }
    return <div>Null</div>;
  }
}

export default DevelopmentSelectScreen;
export { StyledSelectionScreen };
