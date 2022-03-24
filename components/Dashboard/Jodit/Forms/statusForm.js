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
  .status-needs-feedback {
    color: #C92927 !important;
    background: rgba(224, 103, 102, 0.12) !important;
  }
  .status-feedback-given {
    color: #6F25CE !important;
    background: rgba(111, 37, 206, 0.12) !important;
  }
  .status-completed {
    color: #00635A !important;
    background: rgba(0, 124, 112, 0.12) !important;
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
        key: 'Needs feedback',
        text: 'Needs feedback',
        value: 'Needs feedback',
        className: 'info-status status-needs-feedback',
      },
      {
        key: 'Feedback given',
        text: 'Feedback given',
        value: 'Feedback given',
        className: 'info-status status-feedback-given',
      },
      {
        key: 'Completed',
        text: 'Completed',
        value: 'Completed',
        className: 'info-status status-completed',
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
