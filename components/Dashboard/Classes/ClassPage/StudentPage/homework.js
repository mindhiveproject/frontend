import React, { Component } from 'react';

import { Accordion, Icon } from 'semantic-ui-react';

import Homework from '../../Homework/homework';

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
}

export default StudentHomework;
