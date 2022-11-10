import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import Study from './study';
import ComponentSelector from '../Selector/index';

import { StyledSettings } from './styles';

export default class Settings extends Component {
  state = {
    tab: this.props.tab || 'study',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    return (
      <StyledSettings>
        <Menu text stackable className="menu">
          <Menu.Item
            name="study"
            active={tab === 'study'}
            onClick={this.handleItemClick}
            className={
              tab === 'study' ? 'menuTitle selectedMenuTitle' : 'menuTitle'
            }
          >
            <h1>Study settings</h1>
          </Menu.Item>

          <Menu.Item
            name="addBlock"
            active={tab === 'addBlock'}
            onClick={this.handleItemClick}
            className={
              tab === 'addBlock' ? 'menuTitle selectedMenuTitle' : 'menuTitle'
            }
          >
            <h1>Add a study block</h1>
          </Menu.Item>
        </Menu>

        {this.state.tab === 'study' && <Study {...this.props} />}

        {this.state.tab === 'addBlock' && <ComponentSelector {...this.props} />}
      </StyledSettings>
    );
  }
}
