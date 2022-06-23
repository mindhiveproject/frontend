import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DeleteTag from './deleteTag';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class TagRow extends Component {
  render() {
    const { tag } = this.props;
    return (
      <StyledRow>
        <StyledClassRow onClick={() => this.props.openTag(tag)}>
          <div>{tag?.title}</div>
          <div>{moment(tag?.createdAt).format('MMMM D, YYYY')}</div>
          <div>{moment(tag?.updatedAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
        <div className="deleteBtn">
          <DeleteTag tagId={tag.id}>Delete</DeleteTag>
        </div>
      </StyledRow>
    );
  }
}

export default TagRow;
export { StyledClassRow };
