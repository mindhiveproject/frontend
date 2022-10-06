import React, { Component } from 'react';

import styled from 'styled-components';

const StyledSharingPane = styled.div`
  display: grid;
  grid-gap: 30px;
  .collaboratorsList {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .accessLink {
    padding: 15px 10px 15px 10px;
    background: #fff3cd;
    border-radius: 4px;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
    margin-top: 14px;
  }
`;

const ResponseButtons = styled.div`
  display: grid;
  grid-template-columns: 90px 90px;
  grid-template-rows: 48px;
  margin-top: 20px;
  margin-bottom: 30px;
  .selectedBtn {
    background: #007c70;
    color: #ffffff;
  }
`;

class EditSharing extends Component {
  render() {
    const { template } = this.props;

    return (
      <StyledSharingPane>
        <p>Tasks that use this template</p>
        <div>
          {template.tasks.map(task => (
            <div>{task?.title}</div>
          ))}
        </div>
      </StyledSharingPane>
    );
  }
}

export default EditSharing;
