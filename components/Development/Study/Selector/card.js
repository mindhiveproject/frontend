import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../Task/Preview/index';

class Card extends Component {
  state = {
    showPreview: false,
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  addToStudy = survey => {
    this.props.onAddComponent({
      type: 'Task',
      id: survey.id,
      title: survey.title,
    });
  };

  render() {
    const { component } = this.props;

    return (
      <>
        <StyledTaskCard taskType={component.taskType}>
          {component.image && (
            <div className="taskImage">
              <img src={component.image} alt={component.title} />
            </div>
          )}
          <div className="cardInfo">
            <div className="cardHeader">
              <div>
                <h2>{component.title}</h2>
              </div>
              <div>
                <button onClick={() => this.addToStudy(component)}>+</button>
              </div>
            </div>

            <p>{ReactHtmlParser(component.description)}</p>

            <div className="cardButtons">
              <button onClick={() => this.props.openTaskEditor(component.id)}>
                Open Editor
              </button>
              <a onClick={this.togglePreview}>
                <p>Preview</p>
              </a>
            </div>
          </div>
        </StyledTaskCard>
        {this.state.showPreview && (
          <ExperimentPreview
            user={this.props?.user?.id || ''}
            parameters={component.parameters}
            template={component.template}
            handleFinish={() => this.setState({ showPreview: false })}
          />
        )}
      </>
    );
  }
}

export default Card;
