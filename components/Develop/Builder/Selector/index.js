import React, { Component } from 'react';
import { Dropdown, Accordion, Icon } from 'semantic-ui-react';
import debounce from 'lodash.debounce';

import { StyledEditPane } from './styles';

import Blocks from './blocks';
import Templates from './templates';

class ComponentSelector extends Component {
  state = {
    createdBy: this.props.createdBy || 'anyone',
    keyword: '',
    search: '',
    activeIndex: -1,
  };

  handleCreatedBySelect = (event, data) => {
    this.setState({ createdBy: data.value });
  };

  debouncedSearch = debounce(value => {
    this.setState({
      search: value,
    });
  }, 1000);

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.debouncedSearch(e.target.value);
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <StyledEditPane>
        <div className="header">
          <input
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.saveToState}
            placeholder="🔍 Search"
            onFocus={() => {
              this.props.engine.getModel().setLocked(true);
            }}
            onBlur={() => {
              this.props.engine.getModel().setLocked(false);
            }}
          />

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
            className="createdByDropdown"
          />
        </div>

        <Accordion exclusive={false} fluid styled className="blocksMenu">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <p>Basic Blocks</p>
              <Icon name="dropdown" />
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
              componentType={['BLOCK']}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <p>Tasks & Surveys</p>
              <Icon name="dropdown" />
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
              componentType={['TASK', 'SURVEY']}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <p>Templates</p>
              <Icon name="dropdown" />
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Templates
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
            />
          </Accordion.Content>
        </Accordion>

        {false && (
          <>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
            />
          </>
        )}
      </StyledEditPane>
    );
  }
}

export default ComponentSelector;
