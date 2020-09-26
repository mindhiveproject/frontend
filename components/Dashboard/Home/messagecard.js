import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledMessage } from '../styles';

class StudyMessage extends Component {
  render() {
    const { message } = this.props;
    return (
      <StyledMessage>
        <div className="infoMessage">
          <h2>{message.content}</h2>
          <div className="contextInfo">
            {moment(message.createdAt).fromNow()}
          </div>
          <div className="contextInfo">{message.study}</div>
        </div>
        <div className="linkMessage">
          <Link href="/studies/[slug]" as={`/studies/${message.slug}`}>
            <a>
              <p>View</p>
            </a>
          </Link>
        </div>
      </StyledMessage>
    );
  }
}

export default StudyMessage;
