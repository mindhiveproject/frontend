import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import { StyledTask } from './styles';

class TaskPage extends Component {
  state = {};

  render() {
    const { task } = this.props;

    return (
      <StyledTask>
        <Head>
          <title>MindHive | {task.title}</title>
        </Head>

        <div className="studyDescription">
          <h1>{task.title}</h1>
          <div>
            <h3>{ReactHtmlParser(task.descriptionForParticipants)}</h3>
          </div>
          <div className="controlBtns">
            <Link
              href={{
                pathname: '/task/preview',
                query: { id: task.id },
              }}
            >
              <button>Preview</button>
            </Link>
          </div>
        </div>

        <div className="studyInfo">
          <div className="authors">
            <div>
              <h3>Author</h3>
              <p>{task?.author?.username}</p>
            </div>
            {task?.collaborators?.length ? (
              <div>
                <h3>Collaborator(s)</h3>
                {task?.collaborators?.map(col => (
                  <p>{col.username}</p>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div>
            <h3>Settings</h3>
            {task?.parameters?.length && (
              <p>{task?.parameters?.length} parameters</p>
            )}
            {task?.isPublic ? <p>Public</p> : <p>Private</p>}
            {task?.isExternal ? <p>External link</p> : <p>lab.js script</p>}
          </div>

          <div className="time">
            <div>
              <h3>Created</h3>{' '}
              <p>{moment(task?.createdAt).format('MMM D, YYYY')}</p>
            </div>
            <div>
              <h3>Updated</h3>{' '}
              <p>{moment(task?.updatedAt).format('MMM D, YYYY')}</p>
            </div>
          </div>
        </div>
      </StyledTask>
    );
  }
}

export default TaskPage;
