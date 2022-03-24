import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AuthorizedPage from '../../Page/userpage';
import { StyledDasboard, StyledDevelopDasboard } from '../styles';

import ClassesList from './classes';
import ClassNetworks from './classNetworks';
import AddClassNetwork from './addClassNetwork';
import UpdateClassNetwork from './updateClassNetwork';

class DashboardManagement extends Component {
  state = {
    page: this.props.page || 'main',
    tab: this.props.tab || 'classes',
    devInfo: {},
    classNetworkId: null,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  addClassNetwork = () => {
    this.setState({
      page: 'addClassNetwork',
    });
  };

  goBack = () => {
    this.setState({
      page: 'main',
    });
  };

  updateClassNetwork = classNetworkId => {
    this.setState({
      page: 'editClassNetwork',
      classNetworkId,
    });
  };

  render() {
    const { page, tab } = this.state;
    const { user } = this.props;

    if (page === 'main') {
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <StyledDevelopDasboard>
              <h1>Management</h1>
              <div className="navigationHeader">
                <div>
                  <p>
                    All classes and class networks on the platform MindHive.
                  </p>
                </div>
              </div>

              <div>
                <Menu text stackable className="discoverMenu">
                  <Menu.Item
                    name="classes"
                    active={tab === 'classes'}
                    onClick={this.handleItemClick}
                    className={
                      tab === 'classes'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <p>Classes</p>
                  </Menu.Item>
                  <Menu.Item
                    name="classNetworks"
                    active={tab === 'classNetworks'}
                    onClick={this.handleItemClick}
                    className={
                      tab === 'classNetworks'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <p>Class networks</p>
                  </Menu.Item>
                </Menu>
              </div>

              {this.state.tab === 'classes' && <ClassesList />}
              {this.state.tab === 'classNetworks' && (
                <ClassNetworks
                  addClassNetwork={this.addClassNetwork}
                  updateClassNetwork={this.updateClassNetwork}
                />
              )}
            </StyledDevelopDasboard>
          </StyledDasboard>
        </AuthorizedPage>
      );
    }

    if (page === 'addClassNetwork') {
      return (
        <AuthorizedPage>
          <AddClassNetwork goBack={this.goBack} />
        </AuthorizedPage>
      );
    }

    if (page === 'editClassNetwork') {
      return (
        <AuthorizedPage>
          <UpdateClassNetwork
            goBack={this.goBack}
            classNetworkId={this.state.classNetworkId}
          />
        </AuthorizedPage>
      );
    }
  }
}

export default DashboardManagement;
