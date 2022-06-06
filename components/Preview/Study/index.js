import React, { Component } from 'react';
import Head from 'next/head';

import { StyledPage, Inner } from '../../Page/styles';
import { StyledStudyPreviewPage } from '../styles';
import { StyledStudyPage } from '../../Study/styles';

import StudyFrontPage from './frontPage';
import StudyRegistration from './Registration/index';
import TaskPreview from './Task/preview';

class StudyWindow extends Component {
  state = {
    window: 'study',
    virtualUser: { results: [] },
    componentId: null,
    versionId: null,
  };

  onStartRegistration = () => {
    this.setState({ window: 'registration' });
  };

  restartFromFrontPage = () => {
    this.setState({
      window: 'study',
      virtualUser: {},
      componentId: null,
      versionId: null,
    });
  };

  finishRegistration = ({ window }) => {
    this.setState({ window });
  };

  onStartTheTask = ({ componentId, versionId }) => {
    this.setState({ window: 'task', componentId, versionId });
  };

  onEndTheTask = () => {
    this.setState({ window: 'study', componentId: null, versionId: null });
  };

  proceedToPostPrompt = () => {
    this.setState({ window: 'post' });
  };

  updateVirtualUser = virtualUser => {
    this.setState({
      virtualUser,
    });
  };

  render() {
    const { study } = this.props;
    const { window, virtualUser } = this.state;
    const hasRegistered = virtualUser?.hasRegistered;

    return (
      <>
        <Head>
          <title>MindHive | {study.title}</title>
        </Head>
        {window === 'study' && (
          <StyledPage>
            <Inner>
              <StyledStudyPreviewPage>
                <StyledStudyPage>
                  <StudyFrontPage
                    virtualUser={virtualUser}
                    hasRegistered={hasRegistered}
                    study={study}
                    onStartRegistration={this.onStartRegistration}
                    onStartTheTask={this.onStartTheTask}
                  />
                </StyledStudyPage>
              </StyledStudyPreviewPage>
            </Inner>
          </StyledPage>
        )}

        {window === 'registration' && (
          <StyledStudyPreviewPage>
            <StudyRegistration
              user={virtualUser}
              study={study}
              onUpdateVirtualUser={this.updateVirtualUser}
              onInterruptRegistration={this.restartFromFrontPage}
              onFinishRegistration={this.finishRegistration}
              onStartTheTask={this.onStartTheTask}
            />
          </StyledStudyPreviewPage>
        )}

        {(window === 'task' || window === 'post') && (
          <TaskPreview
            user={virtualUser}
            study={study}
            componentId={this.state.componentId}
            versionId={this.state.versionId}
            onUpdateVirtualUser={this.updateVirtualUser}
            onEndTask={this.onEndTheTask}
            onStartTheTask={this.onStartTheTask}
            proceedToPostPrompt={this.proceedToPostPrompt}
            window={window}
          />
        )}
      </>
    );
  }
}

export default StudyWindow;
