import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  input {
    all: unset;
  }
`;

class StatusForm extends Component {
  onChange = (event, data) => {
    this.props.onSettingsChange('status', data.value);
  };

  render() {
    const status = this.props?.settings?.status;
    const options = [
      'Not started',
      'Started',
      'On-Hold',
      'Completed',
      'Closed',
    ].map(option => ({
      key: option,
      text: option,
      value: option,
    }));

    return (
      <StyledDropdown>
        <Dropdown
          placeholder="Select status"
          fluid
          selection
          options={options}
          onChange={this.onChange}
          value={status}
        />
      </StyledDropdown>
    );
  }
}

export default StatusForm;
