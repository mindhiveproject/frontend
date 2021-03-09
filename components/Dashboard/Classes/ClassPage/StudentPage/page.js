import React, { Component } from 'react';
import Head from 'next/head';
import { Menu } from 'semantic-ui-react';

import Journal from './journal';
import Participated from './participated';

class StudentPage extends Component {
  state = {
    tab: this.props.tab || 'participated',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    const { student } = this.props;
    return (
      <>
        <Head>
          <title>Student | {student.username}</title>
        </Head>
        <div>
          <p>{student.username}</p>
          <p>{student.authEmail.length && student.authEmail[0].email}</p>
        </div>

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
            </Menu>
          </div>

          {this.state.tab === 'participated' && (
            <Participated student={student} />
          )}

          {this.state.tab === 'created' && <div> 🚧🏗🚜🗜👷 In development</div>}

          {this.state.tab === 'reviewed' && <div>In development 🚧🏗👷</div>}

          {this.state.tab === 'journal' && <Journal studentId={student.id} />}
        </div>
      </>
    );
  }
}

export default StudentPage;
