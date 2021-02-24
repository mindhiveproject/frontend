import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import OverviewStudiesBank from '../../Bank/Studies/overview';
import DevelopedComponentsBank from '../../Bank/Components/developed';

import AuthorizedPage from '../../Page/userpage';
import EmptyPage from '../../Page/empty';

import DevelopmentSelectScreen from '../../Development/selectScreen';
import StudyBuilderWrapper from '../../Development/Study/builderWrapper';
import ComponentBuilderWrapper from '../../Development/Component/builderWrapper';

import { StyledDasboard, StyledDevelopDasboard } from '../styles';

class DashboardOverview extends Component {
  state = {
    page: this.props.page || 'bank',
    tab: this.props.tab || 'studies',
    devInfo: {},
    readOnlyMode: true,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  goToStudy = study => {
    this.setState({
      page: 'studyBuilder',
      devInfo: {
        studyIdToClone: study.id,
      },
    });
  };

  openComponentEditor = component => {
    this.setState({
      page: 'componentBuilder',
      devInfo: {
        componentId: component.id,
      },
    });
  };

  switchToBank = () => {
    this.setState({
      page: 'bank',
    });
  };

  render() {
    const { page, tab } = this.state;
    const { user } = this.props;

    if (page === 'bank') {
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <StyledDevelopDasboard>
              <h1>Overview</h1>
              <div className="navigationHeader">
                <div>
                  <p>All studies on the platform MindHive.</p>
                </div>
              </div>

              <div>
                <Menu text stackable className="discoverMenu">
                  <Menu.Item
                    name="studies"
                    active={tab === 'studies'}
                    onClick={this.handleItemClick}
                    className={
                      tab === 'studies'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <p>All studies</p>
                  </Menu.Item>
                </Menu>
              </div>

              {this.state.tab === 'studies' && (
                <OverviewStudiesBank
                  onSelectStudy={this.goToStudy}
                  user={this.props.user}
                  readOnlyMode={this.state.readOnlyMode}
                />
              )}

              {this.state.tab === 'tasks' && (
                <DevelopedComponentsBank
                  componentType="TASK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {this.state.tab === 'surveys' && (
                <DevelopedComponentsBank
                  componentType="SURVEY"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}
            </StyledDevelopDasboard>
          </StyledDasboard>
        </AuthorizedPage>
      );
    }
    if (page === 'develop') {
      return (
        <EmptyPage>
          <DevelopmentSelectScreen
            onClose={this.switchToBank}
            user={this.props.user}
            devInfo={this.state.devInfo}
          />
        </EmptyPage>
      );
    }
    if (page === 'studyBuilder') {
      return (
        <EmptyPage>
          <StudyBuilderWrapper
            onLeave={this.switchToBank}
            studyId={this.state.devInfo.studyIdToClone}
            user={this.props.user}
            needToClone={false}
            readOnlyMode={this.state.readOnlyMode}
          />
        </EmptyPage>
      );
    }
    if (page === 'componentBuilder') {
      return (
        <EmptyPage>
          <ComponentBuilderWrapper
            onLeave={this.switchToBank}
            componentId={this.state.devInfo.componentId}
            user={this.props.user}
            needToClone={false}
          />
        </EmptyPage>
      );
    }
  }
}

export default DashboardOverview;
