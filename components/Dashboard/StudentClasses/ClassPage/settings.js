import React, { Component } from 'react';
import styled from 'styled-components';

import DeleteClass from '../../../Class/Delete/index';

const StyledInformationBlock = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  .block {
    padding: 20px;
    background: white;
  }
`;

class ClassSettings extends Component {
  render() {
    return (
      <div>
        <h2>Delete your class</h2>
        <p>
          Deleting your class will permanently delete your class within the “My
          Classes” area. This action cannot be undone.
        </p>

        <StyledInformationBlock>
          <div className="block">
            <p>You will not have access to:</p>
            <ul>
              <li>Your class</li>
              <li>
                Any studies or results generated from students in your class
              </li>
            </ul>
          </div>

          <div className="block">
            <p>Your students will have access to:</p>
            <ul>
              <li>
                Their workspace and any studies, tasks or surveys they created
                during your class
              </li>
              <li>Note: New students will not be able to join your class</li>
            </ul>
          </div>
        </StyledInformationBlock>

        <DeleteClass
          id={this.props.schoolclass.id}
          redirect
          redirectFunction={this.props.onClose}
        >
          Delete
        </DeleteClass>
      </div>
    );
  }
}

export default ClassSettings;
