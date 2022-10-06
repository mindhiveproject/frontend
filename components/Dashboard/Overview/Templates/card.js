import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledTaskCard } from './styles';

class TaskCard extends Component {
  render() {
    const { template, user, onSelectTemplate } = this.props;
    const isAuthor = user?.id === template?.author?.id;

    return (
      <div
        onClick={e => {
          onSelectTemplate(template);
        }}
      >
        <StyledTaskCard>
          <div className="cardInfo">
            <div className="title">
              <div>{template.title}</div>

              <div className="rightSide">
                {template.description && (
                  <Popup
                    content={ReactHtmlParser(template.description)}
                    size="huge"
                    trigger={<Icon name="info circle" size="large" />}
                  />
                )}
              </div>
            </div>
          </div>
        </StyledTaskCard>
      </div>
    );
  }
}

export default TaskCard;
