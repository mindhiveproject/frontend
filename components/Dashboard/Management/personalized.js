import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AuthorizedPage from '../../Page/userpage';
import { StyledDasboard, StyledDevelopDasboard } from '../styles';

import ClassesList from './classes';
import ClassNetworksList from './classNetworks';
import AddClassNetwork from './addClassNetwork';

class DashboardManagement extends Component {
  state = {
    page: this.props.page || 'main',
    tab: this.props.tab || 'classes',
    devInfo: {},
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
      // id: null,
    });
  };

  // switchToBank = () => {
  //   this.setState({
  //     page: 'main',
  //   });
  // };

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
                <ClassNetworksList addClassNetwork={this.addClassNetwork} />
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
  }
}

export default DashboardManagement;
