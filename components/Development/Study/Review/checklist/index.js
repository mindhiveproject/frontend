import React, { Component } from 'react';
import styled from 'styled-components';
import CheckModal from './modal';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  align-items: center;
  height: 88px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 20px 29px 20px 29px;
  .checkboxHolder {
    display: grid;
    align-items: center;
  }
  input[type='checkbox'] {
    transform: scale(2);
    cursor: pointer;
  }
`;

class ChecklistItem extends Component {
  render() {
    const { name, title, description, action } = this.props.item;
    const { isComplete, toggleCheckTo, updateProposalMutation } = this.props;
    return (
      <StyledItem>
        <div className="checkboxHolder">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={() =>
              toggleCheckTo(name, !isComplete, updateProposalMutation)
            }
          />
        </div>

        <CheckModal
          name={name}
          title={title}
          description={description}
          action={action}
          takeAction={this.props.takeAction}
          isComplete={isComplete}
          toggleCheckTo={toggleCheckTo}
          updateProposalMutation={updateProposalMutation}
        />
      </StyledItem>
    );
  }
}

export default ChecklistItem;
