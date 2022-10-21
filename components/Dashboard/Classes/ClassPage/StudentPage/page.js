import React, { Component } from 'react';
import Head from 'next/head';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import Participated from './participated';
import Created from './created';
import Reviewed from './reviewed';
import Journal from './journal';
import Homework from './homework';
import Settings from './settings';

const StudentHeader = styled.div`
  display: grid;
  margin: 1rem 0rem;
  padding: 10px;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  align-content: center;
  height: 100%;
  font-size: 2rem;
`;

class StudentPage extends Component {
  state = {
    tab: this.props.tab || 'participated',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    const { student, adminMode } = this.props;
    const id =
      student.publicReadableId || student.publicId || student.id || 'John Doe';
    return (
      <>
        <Head>
          <title>Student | {id}</title>
        </Head>

        <StudentHeader>
          {adminMode ? (
            <div>{id}</div>
          ) : (
            <div>
              <p>{student.username}</p>
              <p>{student.authEmail.length && student.authEmail[0].email}</p>
            </div>
          )}
        </StudentHeader>

        <div>
          <div>
            <Menu text stackable className="discoverMenu">
              <Menu.Item
                name="participated"
                active={tab === 'participated'}
                onClick={this.handleItemClick}
                className={
                  tab === 'participated'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Participated</p>
              </Menu.Item>
              <Menu.Item
                name="created"
                active={tab === 'created'}
                onClick={this.handleItemClick}
                className={
                  tab === 'created'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Created</p>
              </Menu.Item>
              <Menu.Item
                name="reviewed"
                active={tab === 'reviewed'}
                onClick={this.handleItemClick}
                className={
                  tab === 'reviewed'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Reviewed</p>
              </Menu.Item>
              <Menu.Item
                name="journal"
                active={tab === 'journal'}
                onClick={this.handleItemClick}
                className={
                  tab === 'journal'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Journal</p>
              </Menu.Item>
              <Menu.Item
                name="homework"
                active={tab === 'homework'}
                onClick={this.handleItemClick}
                className={
                  tab === 'homework'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Homework</p>
              </Menu.Item>
              {adminMode && (
                <Menu.Item
                  name="settings"
                  active={tab === 'settings'}
                  onClick={this.handleItemClick}
                  className={
                    tab === 'settings'
                      ? 'discoverMenuTitle selectedMenuTitle'
                      : 'discoverMenuTitle'
                  }
                >
                  <p>Settings</p>
                </Menu.Item>
              )}
            </Menu>
          </div>

          {this.state.tab === 'participated' && (
            <Participated student={student} />
          )}

          {this.state.tab === 'created' && <Created student={student} />}

          {this.state.tab === 'reviewed' && <Reviewed student={student} />}

          {this.state.tab === 'journal' && <Journal studentId={student.id} />}

          {this.state.tab === 'homework' && <Homework student={student} />}

          {this.state.tab === 'settings' && <Settings user={student} />}
        </div>
      </>
    );
  }
}

export default StudentPage;
