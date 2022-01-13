import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import { Menu } from 'semantic-ui-react';
import Error from '../../ErrorMessage/index';

import ClassHeader from './ClassPage/classHeader';
import ClassStudents from './ClassPage/students';
import ClassMentors from './ClassPage/mentors';
import ClassStudies from './ClassPage/studies';
import ClassAssignments from './Assignment/wrapper';
import ClassSettings from './ClassPage/settings';

import FetchStudentPage from './ClassPage/StudentPage/index';

import { StyledDasboard, StyledDevelopDasboard } from '../styles';

const REVIEW_CLASS_QUERY = gql`
  query REVIEW_CLASS_QUERY($id: ID!) {
    class(where: { id: $id }) {
      id
      title
      code
      description
      creator {
        id
        username
      }
      createdAt
      students {
        id
        username
        image
        authEmail {
          email
        }
      }
      mentors {
        id
        username
        authEmail {
          email
        }
      }
      settings
    }
  }
`;

class ClassPage extends Component {
  state = {
    classPage: this.props.classPage || 'list',
    studentId: null,
    tab: this.props.tab || 'students',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  openStudentPage = studentId => {
    this.setState({
      classPage: 'student',
      studentId,
    });
  };

  goBackToList = () => {
    this.setState({
      classPage: 'list',
      studentId: null,
    });
  };

  render() {
    const { classId } = this.props;
    const { classPage, tab } = this.state;

    if (classPage === 'list') {
      return (
        <StyledDasboard>
          <StyledDevelopDasboard>
            <>
              <div className="goBackBtn">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={
                    // this.props.featuredAssignmentId
                    //   ? this.props.goBackTo('assignments') :
                    this.props.goBack
                  }
                >
                  {this.props.backButtonText || '← Back'}
                </span>
              </div>
            </>
            <Query query={REVIEW_CLASS_QUERY} variables={{ id: classId }}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;
                if (!data.class) return <p>No class found for {classId}</p>;
                const schoolclass = data.class;

                return (
                  <div>
                    <Head>
                      <title>mindHIVE | {schoolclass.title}</title>
                    </Head>
                    {!this.props.featuredAssignmentId && (
                      <ClassHeader schoolclass={schoolclass} />
                    )}

                    <div>
                      {!this.props.featuredAssignmentId && (
                        <div>
                          <Menu text stackable className="discoverMenu">
                            <Menu.Item
                              name="students"
                              active={tab === 'students'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'students'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Students</p>
                            </Menu.Item>

                            <Menu.Item
                              name="mentors"
                              active={tab === 'mentors'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'mentors'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Mentors</p>
                            </Menu.Item>

                            <Menu.Item
                              name="studies"
                              active={tab === 'studies'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'studies'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Studies</p>
                            </Menu.Item>

                            <Menu.Item
                              name="assignments"
                              active={tab === 'assignments'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'assignments'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Assignments</p>
                            </Menu.Item>

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
                          </Menu>
                        </div>
                      )}

                      {this.state.tab === 'students' && (
                        <ClassStudents
                          schoolclass={schoolclass}
                          openStudentPage={this.openStudentPage}
                        />
                      )}

                      {this.state.tab === 'mentors' && (
                        <ClassMentors
                          schoolclass={schoolclass}
                          openStudentPage={this.openStudentPage}
                        />
                      )}

                      {this.state.tab === 'studies' && (
                        <ClassStudies schoolclass={schoolclass} />
                      )}

                      {this.state.tab === 'assignments' && (
                        <ClassAssignments
                          schoolclass={schoolclass}
                          featuredAssignmentId={this.props.featuredAssignmentId}
                        />
                      )}

                      {this.state.tab === 'settings' && (
                        <ClassSettings
                          schoolclass={schoolclass}
                          onClose={this.props.goBack}
                        />
                      )}
                    </div>
                  </div>
                );
              }}
            </Query>
          </StyledDevelopDasboard>
        </StyledDasboard>
      );
    }

    if (classPage === 'student') {
      return (
        <FetchStudentPage
          studentId={this.state.studentId}
          classId={classId}
          goBackToList={this.goBackToList}
        />
      );
    }
  }
}

export default ClassPage;
export { REVIEW_CLASS_QUERY };
