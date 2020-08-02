import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import TaskCard from '../TaskCard/index';

class CustomizedLandingPage extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_RESULTS_QUERY} pollInterval={5000}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me) return <p>No information found for your profile.</p>;
          const { study } = this.props;
          const { me } = data;
          const studyIds = me.participantIn.map(study => study.id);
          const policy = (me.info && me.info[study.id]) || 'preview';

          const fullResultsInThisStudy = me.results
            .filter(
              result =>
                result.study.id === study.id && result.payload === 'full'
            )
            .map(result => result.task.id);

          if (studyIds.includes(study.id)) {
            return (
              <div>
                {study.tasks &&
                  study.tasks.map((task, num) => (
                    <TaskCard
                      key={num}
                      task={task}
                      policy={policy.data}
                      studyId={study.id}
                      studySlug={study.slug}
                      user={me}
                      completed={fullResultsInThisStudy.includes(task.id)}
                    />
                  ))}
              </div>
            );
          }
          return <button onClick={this.props.onJoinStudy}>Participate</button>;
        }}
      </Query>
    );
  }
}

export default CustomizedLandingPage;
