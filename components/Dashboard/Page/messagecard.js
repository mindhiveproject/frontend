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
          <p>
            {moment(message.createdAt).fromNow()} by {message.study}
          </p>
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
