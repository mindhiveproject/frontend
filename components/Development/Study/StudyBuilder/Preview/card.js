import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import styled from 'styled-components';
import ExperimentPreview from '../../../../Task/Preview/index';

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

  render() {
    const {
      component,
      viewing,
      blockNumber,
      betweenNumber,
      withinNumber,
    } = this.props;

    return (
      <>
        <div taskType={component.taskType}>
          {component.image && (
            <div className="taskImage">
              <img src={component.image} alt={component.title} />
            </div>
          )}
          <div className="cardInfo">
            <div className="cardHeader">
              <div>
                <h2>{component.title}</h2>
                <p>{component.subtitle}</p>
              </div>
              {this.props.onAddComponent && (
                <div>
                  <button onClick={() => this.props.onAddComponent(component)}>
                    +
                  </button>
                </div>
              )}
              {this.props.onRemoveWholeComponent && (
                <div>
                  <button
                    onClick={() =>
                      this.props.onRemoveWholeComponent(blockNumber)
                    }
                  >
                    &times;
                  </button>
                </div>
              )}
              {this.props.onRemoveComponent && (
                <div>
                  <button
                    onClick={() =>
                      this.props.onRemoveComponent(
                        component,
                        blockNumber,
                        betweenNumber,
                        withinNumber
                      )
                    }
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <div>
              {viewing === 'before' &&
                ReactHtmlParser(component?.settings?.descriptionBefore)}
              {viewing === 'after' &&
                ReactHtmlParser(component?.settings?.descriptionAfter)}
            </div>

            <div>
              {this.props.showDeveloperInfo &&
                ReactHtmlParser(component.description)}
            </div>

            <div className="cardButtons">
              {this.props.openTaskEditor && !component.link && (
                <button onClick={() => this.props.openTaskEditor(component.id)}>
                  Open Editor
                </button>
              )}
              {this.props.onSelectComponent && !component.link && (
                <button
                  onClick={() => {
                    this.props.onSelectComponent(component);
                  }}
                >
                  Select
                </button>
              )}

              {!component.link && (
                <a onClick={this.togglePreview}>
                  <p>Preview</p>
                </a>
              )}

              {component.link && (
                <a target="_blank" href={component.link}>
                  <p>Preview</p>
                </a>
              )}

              {this.props.inStudyBuilder && (
                <Link
                  href={{
                    pathname: '/task/results',
                    query: { id: component.id },
                  }}
                >
                  <button>Task results</button>
                </Link>
              )}
            </div>
          </div>
        </div>
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
