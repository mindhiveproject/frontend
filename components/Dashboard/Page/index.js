import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';

import UniversalBlock from './block';

// permissions
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';

class DashboardStatic extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {({ data, loading, error }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me) return <p>No user found. Please sign up or login.</p>;

          return (
            <div>
              <h1>Dashboard</h1>

              {data.me.participantIn && data.me.participantIn.length ? (
                <div>
                  <h2>Studies where you are a participant</h2>
                  <UniversalBlock data={data.me.participantIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.studentIn && data.me.studentIn.length ? (
                <div>
                  <h2>Classes where you are a student</h2>
                  <UniversalBlock data={data.me.studentIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.teacherIn && data.me.teacherIn.length ? (
                <div>
                  <h2>Classes where you are a teacher</h2>
                  <UniversalBlock data={data.me.teacherIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.researcherIn && data.me.researcherIn.length ? (
                <div>
                  <h2>Studies where you are a researcher</h2>
                  <UniversalBlock data={data.me.researcherIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.collaboratorInStudy &&
              data.me.collaboratorInStudy.length ? (
                <div>
                  <h2>Studies where you are a collaborator</h2>
                  <UniversalBlock data={data.me.collaboratorInStudy} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.taskCreatorIn && data.me.taskCreatorIn.length ? (
                <div>
                  <h2>Tasks which you have created</h2>
                  <UniversalBlock data={data.me.taskCreatorIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.collaboratorInTask &&
              data.me.collaboratorInTask.length ? (
                <div>
                  <h2>Tasks where you are a collaborator</h2>
                  <UniversalBlock data={data.me.collaboratorInTask} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
