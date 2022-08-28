import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import debounce from 'lodash.debounce';

import { StyledEditPane } from './styles';

import Blocks from './blocks';

class ComponentSelector extends Component {
  state = {
    createdBy: this.props.createdBy || 'anyone',
    keyword: '',
    search: '',
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

  render() {
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
        <Blocks
          {...this.props}
          createdBy={this.state.createdBy}
          search={this.state.search}
        />
      </StyledEditPane>
    );
  }
}

export default ComponentSelector;
