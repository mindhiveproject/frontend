import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import CardWrapper from './cardWrapper';

class Menu extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion exclusive={false} fluid styled className="blocksMenu">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <div className="blocksMenuTitle">
            <p>Basic Blocks</p>
            <Icon name="dropdown" />
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <div className="blocksMenuContent">
            {this.props.blocks
              .filter(task => task?.taskType === 'BLOCK')
              .map(task => (
                <CardWrapper
                  {...this.props}
                  key={task.id}
                  component={task}
                  redirect="d"
                />
              ))}
          </div>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <div className="blocksMenuTitle">
            <p>Tasks & Surveys</p>
            <Icon name="dropdown" />
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <div className="blocksMenuContent">
            {this.props.blocks
              .filter(
                task => task?.taskType === 'TASK' || task?.taskType === 'SURVEY'
              )
              .map(task => (
                <CardWrapper
                  {...this.props}
                  key={task.id}
                  component={task}
                  redirect="d"
                />
              ))}
          </div>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default Menu;
