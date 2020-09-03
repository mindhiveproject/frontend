import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import TaskCard from '../TaskCard/index';

class CustomizedLandingPage extends Component {
  render() {
    const { user } = this.props;
    const { study } = this.props;
    const studyIds = user.participantIn.map(study => study.id);

    const fullResultsInThisStudy = user.results
      .filter(
        result =>
          result.study &&
          result.study.id === study.id &&
          result.payload === 'full'
      )
      .map(result => result.task.id);

    // console.log('fullResultsInThisStudy', fullResultsInThisStudy);

    if (studyIds.includes(study.id)) {
      return (
        <div>
          {study.tasks &&
            study.tasks.map((task, num) => (
              <TaskCard
                key={num}
                task={task}
                studyId={study.id}
                studySlug={study.slug}
                user={user}
                study={study}
                completed={fullResultsInThisStudy.includes(task.id)}
                onStartTheTask={this.props.onStartTheTask}
                onStartExternalTask={this.props.onStartExternalTask}
              />
            ))}
        </div>
      );
    }
    return <button onClick={this.props.onJoinStudy}>Participate</button>;
  }
}

export default CustomizedLandingPage;

// {false && (
//   <div>
//     <Link
//       href={{
//         pathname: '/study/consent',
//         query: { id: study.id },
//       }}
//     >
//       <a>
//         <h2>
//           <button>Update consent</button>
//         </h2>
//       </a>
//     </Link>
//   </div>
// )}
