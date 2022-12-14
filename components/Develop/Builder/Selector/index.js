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
    activeIndex: [],
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
    let newIndex;
    if (activeIndex.includes(index)) {
      newIndex = activeIndex.filter(i => i !== index);
    } else {
      newIndex = [...activeIndex, index];
    }
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
              {
                key: 'favorite',
                text: 'My favorite',
                value: 'favorite',
              },
            ]}
            onChange={this.handleCreatedBySelect}
            value={this.state.createdBy}
            className="createdByDropdown"
          />
        </div>

        <Accordion exclusive={false} fluid styled className="blocksMenu">
          <Accordion.Title
            active={activeIndex.includes(0)}
            index={0}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <h3>Basic Blocks</h3>
              <Icon name="dropdown" />
              <p>
                Want to include <strong>custom instructions</strong> to your
                participants or <strong>embed a link and/or video</strong> in
                your study’s procedure? Select and edit a basic block
              </p>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex.includes(0)}>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
              componentType={['BLOCK']}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex.includes(1)}
            index={1}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <h3>Tasks</h3>
              <Icon name="dropdown" />
              <p>
                Want to <strong>measure a construct or variable</strong> by
                having participants <strong>complete an activity</strong>?
                Choose from this bank of validated tasks
              </p>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex.includes(1)}>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
              componentType={['TASK']}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex.includes(2)}
            index={2}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <h3>Surveys</h3>
              <Icon name="dropdown" />
              <p>
                Want to{' '}
                <strong>
                  measure participants’ attitudes, experiences, or opinions
                </strong>{' '}
                through <strong>self-report</strong>? Choose from this bank of
                validated surveys
              </p>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex.includes(2)}>
            <Blocks
              {...this.props}
              createdBy={this.state.createdBy}
              search={this.state.search}
              componentType={['SURVEY']}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex.includes(3)}
            index={3}
            onClick={this.handleClick}
          >
            <div className="blocksMenuTitle">
              <h3>Templates</h3>
              <Icon name="dropdown" />
              <p>
                Don’t want to start from scratch? Select and edit a{' '}
                <strong>pre-made study design</strong> using one of the
                templates in this bank
              </p>
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex.includes(3)}>
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
