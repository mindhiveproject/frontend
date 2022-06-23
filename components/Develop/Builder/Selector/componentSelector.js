import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

import { StyledEditPane } from './styles';

import Favorite from './Selector/favorite';
import Surveys from './Selector/surveys';
import MySurveys from './Selector/mySurveys';
import Tasks from './Selector/tasks';
import MyTasks from './Selector/myTasks';
import Blocks from './Selector/blocks';
import MyBlocks from './Selector/myBlocks';

const createdByOptions = [
  {
    key: 'anyone',
    text: 'anyone',
    value: 'anyone',
  },
  {
    key: 'me',
    text: 'me',
    value: 'me',
  },
];

class componentSelector extends Component {
  state = {
    tab: this.props.tab || 'favorite',
    createdBy: this.props.createdBy || 'anyone',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  handleCreatedBySelect = (event, data) => {
    this.setState({ createdBy: data.value });
  };

  render() {
    const { tab, createdBy } = this.state;
    return (
      <StyledEditPane>
        <div className="closeBtnContainerEdit">
          <span
            className="closeBtnEdit"
            onClick={() => this.props.toggleTaskSelector(false)}
          >
            &times;
          </span>
        </div>

        <Menu text stackable className="discoverMenu">
          <Menu.Item
            name="favorite"
            active={tab === 'favorite'}
            onClick={this.handleItemClick}
            className={
              tab === 'favorite'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Favorites</p>
          </Menu.Item>

          <Menu.Item
            name="surveys"
            active={tab === 'surveys'}
            onClick={this.handleItemClick}
            className={
              tab === 'surveys'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Surveys</p>
          </Menu.Item>

          <Menu.Item
            name="tasks"
            active={tab === 'tasks'}
            onClick={this.handleItemClick}
            className={
              tab === 'tasks'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Tasks</p>
          </Menu.Item>

          <Menu.Item
            name="blocks"
            active={tab === 'blocks'}
            onClick={this.handleItemClick}
            className={
              tab === 'blocks'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>Blocks</p>
          </Menu.Item>
        </Menu>

        <div className="createdByDropdown">
          <Dropdown
            fluid
            selection
            options={[
              {
                key: 'anyone',
                text: 'Created by anyone',
                value: 'anyone',
              },
              {
                key: 'me',
                text: 'Owned by me',
                value: 'me',
              },
            ]}
            onChange={this.handleCreatedBySelect}
            value={this.state.createdBy}
          />
        </div>

        {this.state.tab === 'favorite' && (
          <Favorite
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
            selector={this.state.createdBy}
          />
        )}

        {this.state.tab === 'surveys' && this.state.createdBy === 'anyone' && (
          <Surveys
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}
        {this.state.tab === 'surveys' && this.state.createdBy === 'me' && (
          <MySurveys
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}

        {this.state.tab === 'tasks' && this.state.createdBy === 'anyone' && (
          <Tasks
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}
        {this.state.tab === 'tasks' && this.state.createdBy === 'me' && (
          <MyTasks
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}

        {this.state.tab === 'blocks' && this.state.createdBy === 'anyone' && (
          <Blocks
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}
        {this.state.tab === 'blocks' && this.state.createdBy === 'me' && (
          <MyBlocks
            onAddComponent={this.props.onAddComponent}
            openTaskEditor={this.props.openTaskEditor}
          />
        )}
      </StyledEditPane>
    );
  }
}

export default componentSelector;
