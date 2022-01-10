import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledClassRow = styled.div`
  display: grid;
  padding: 1.5rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
`;

class ClassRow extends Component {
  render() {
    const { myclass } = this.props;
    return (
      <div onClick={() => this.props.openClass(myclass.id)}>
        <StyledClassRow>
          <div>{myclass.title}</div>
          <div>{myclass.students.length}</div>
          <div>{moment(myclass.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
      </div>
    );
  }
}

export default ClassRow;
export { StyledClassRow };
