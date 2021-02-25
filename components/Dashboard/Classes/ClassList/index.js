import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class ClassRow extends Component {
  render() {
    const { myclass } = this.props;
    return (
      <div onClick={() => this.props.openClass(myclass.id)}>
        <StyledClassRow>
          <div>{myclass.title}</div>
          <div>{myclass.students.length} students</div>
          <div>{moment(myclass.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
      </div>
    );
  }
}

export default ClassRow;
