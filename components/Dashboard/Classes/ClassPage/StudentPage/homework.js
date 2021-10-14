import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

import styled from 'styled-components';
import Homework from '../../Homework/homework';

const EmptyRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr;
  background: white;
  grid-gap: 1rem;
  text-align: center;
  align-content: center;
  height: 100%;
`;

class StudentHomework extends Component {
  state = {};

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    if (this.props?.student?.authorOfHomework?.length > 0) {
      return (
        <Accordion>
          {this.props.student.authorOfHomework.map((homework, id) => (
            <>
              <Accordion.Title
                active={activeIndex === id}
                index={id}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {homework?.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === id}>
                <Homework homeworkId={homework?.id} />
              </Accordion.Content>
            </>
          ))}
        </Accordion>
      );
    }

    return (
      <EmptyRow>
        <div>The student hasn’t written any homework yet.</div>
      </EmptyRow>
    );
  }
}

export default StudentHomework;
