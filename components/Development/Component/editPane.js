import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import { StyledEditPane } from '../styles';

import EditBasic from './Edit/editBasic';
import EditParameters from './Edit/editParameters';
import EditSharing from './Edit/editSharing';

class EditPane extends Component {
  state = {
    tab: this.props.tab || 'basic',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    return (
      <>
        <StyledEditPane>
          <Menu text stackable className="discoverMenu">
            <Menu.Item
              name="basic"
              active={tab === 'basic'}
              onClick={this.handleItemClick}
              className={
                tab === 'basic'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Basic</p>
            </Menu.Item>

            <Menu.Item
              name="parameters"
              active={tab === 'parameters'}
              onClick={this.handleItemClick}
              className={
                tab === 'parameters'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Parameters</p>
            </Menu.Item>

            <Menu.Item
              name="sharing"
              active={tab === 'sharing'}
              onClick={this.handleItemClick}
              className={
                tab === 'sharing'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Sharing</p>
            </Menu.Item>
          </Menu>

          {this.state.tab === 'basic' && (
            <EditBasic
              task={this.props.task}
              handleTaskChange={this.props.handleTaskChange}
              handleSettingsChange={this.props.handleSettingsChange}
              handleSetMultipleValuesInState={
                this.props.handleSetMultipleValuesInState
              }
            />
          )}

          {this.state.tab === 'parameters' && (
            <EditParameters
              task={this.props.task}
              handleParameterChange={this.props.handleParameterChange}
            />
          )}

          {this.state.tab === 'sharing' && (
            <EditSharing
              task={this.props.task}
              handleCollaboratorsChange={this.props.handleCollaboratorsChange}
              handleSetState={this.props.handleSetState}
            />
          )}
        </StyledEditPane>
      </>
    );
  }
}

export default EditPane;
