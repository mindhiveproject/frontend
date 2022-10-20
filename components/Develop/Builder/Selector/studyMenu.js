import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import StudyCard from './studyCard';

class Menu extends Component {
  state = { activeIndex: -1 };

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
            <p>Templates</p>
            <Icon name="dropdown" />
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <div className="blocksMenuContent">
            {this.props.studies.map(study => (
              <StudyCard
                {...this.props}
                key={study.id}
                study={study}
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
