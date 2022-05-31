import React, { Component } from 'react';
import Head from 'next/head';

import { StyledPage, Inner } from '../../Page/styles';
import { StyledStudyPreviewPage } from '../styles';
import { StyledStudyPage } from '../../Study/styles';

import StudyFrontPage from './frontPage';
import StudyRegistration from './Registration/index';
import TaskPreview from './Task/preview';

class StudyWindow extends Component {
  state = { window: 'study', virtualUser: {}, componentId: null };

  onStartRegistration = () => {
    this.setState({ window: 'registration' });
  };

  restartFromFrontPage = () => {
    this.setState({ window: 'study', virtualUser: {} });
  };

  finishRegistration = ({ window }) => {
    this.setState({ window });
  };

  onStartTheTask = ({ componentId }) => {
    this.setState({ window: 'task', componentId });
  };

  onEndTheTask = () => {
    this.setState({ window: 'study' });
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
              study={study}
              user={virtualUser}
              onUpdateVirtualUser={this.updateVirtualUser}
              onInterruptRegistration={this.restartFromFrontPage}
              onFinishRegistration={this.finishRegistration}
            />
          </StyledStudyPreviewPage>
        )}

        {window === 'task' && (
          <TaskPreview
            user={virtualUser}
            componentId={this.state.componentId}
            handleFinish={this.onEndTheTask}
          />
        )}
      </>
    );
  }
}

export default StudyWindow;
