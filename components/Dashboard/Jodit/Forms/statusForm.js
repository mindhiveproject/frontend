import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  input {
    all: unset;
  }
  .info-status {
    display: table;
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.05em;
    border-radius: 30px;
    position: absolute;
    margin: 8px;
  }
  .status-not-started {
    color: #896900 !important;
    background: rgba(254, 210, 79, 0.18) !important;
  }
  .status-started {
    color: #0063CE !important;
    background: rgba(0, 117, 224, 0.12) !important;
  }
  .status-on-hold {
    color: #C92927 !important;
    background: rgba(224, 103, 102, 0.12) !important;
  }
  .status-completed {
    color: #00635A !important;
    background: rgba(0, 124, 112, 0.12) !important;
  }
  .status-closed {
    color: #1A1A1A !important;
    background: rgba(0, 0, 0, 0.12) !important;
  }
  .info-status :hover {
    background: #F7F7F7 !important;
  }
`;

class StatusForm extends Component {
  onChange = (event, data) => {
    this.props.onSettingsChange('status', data.value);
  };

  render() {
    const status = this.props?.settings?.status;
    const options = [
      {
        key: 'Not started',
        text: 'Not started',
        value: 'Not started',
        className: 'info-status status-not-started',
      },
      {
        key: 'Started',
        text: 'Started',
        value: 'Started',
        className: 'info-status status-started',
      },
      {
        key: 'On hold',
        text: 'On hold',
        value: 'On hold',
        className: 'info-status status-on-hold',
      },
      {
        key: 'Completed',
        text: 'Completed',
        value: 'Completed',
        className: 'info-status status-completed',
      },
      {
        key: 'Closed',
        text: 'Closed',
        value: 'Closed',
        className: 'info-status status-closed',
      }
    ];

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
