import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import { StyledTaskPreviewPane } from './styles';

import TabPreview from './Preview/tabPreview';
import TaskPreview from './Preview/taskPreview';

class PreviewPane extends Component {
  state = {
    tab: this.props.tab || 'before',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    const { task } = this.props;

    return (
      <StyledTaskPreviewPane>
        <Menu text stackable className="discoverMenu">
          <Menu.Item
            name="before"
            active={tab === 'before'}
            onClick={this.handleItemClick}
            className={
              tab === 'before'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>pre-participation</p>
          </Menu.Item>

          <Menu.Item
            name="during"
            active={tab === 'during'}
            onClick={this.handleItemClick}
            className={
              tab === 'during'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>task preview</p>
          </Menu.Item>

          <Menu.Item
            name="after"
            active={tab === 'after'}
            onClick={this.handleItemClick}
            className={
              tab === 'after'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <p>post-participation</p>
          </Menu.Item>
        </Menu>

        {this.state.tab === 'before' && (
          <TabPreview task={task} state="before" />
        )}

        {this.state.tab === 'during' && (
          <TaskPreview task={task} user={this.props.user} />
        )}

        {this.state.tab === 'after' && <TabPreview task={task} state="after" />}
      </StyledTaskPreviewPane>
    );
  }
}

export default PreviewPane;
