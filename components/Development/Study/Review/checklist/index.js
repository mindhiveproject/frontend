import React, { Component } from 'react';
import styled from 'styled-components';
import CheckModal from './modal';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 100px;
  height: 88px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 20px 29px 20px 29px;
`;

class ChecklistItem extends Component {
  render() {
    return (
      <StyledItem>
        <div>Check</div>
        <div>{this.props.item}</div>
        <CheckModal onBtnClick={this.props.onBtnClick} />
      </StyledItem>
    );
  }
}

export default ChecklistItem;
