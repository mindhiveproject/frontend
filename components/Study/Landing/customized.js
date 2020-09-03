import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
// import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import TaskCard from '../TaskCard/index';

class CustomizedLandingPage extends Component {
  render() {
    const { user } = this.props;
    const { study } = this.props;
    const studyIds = user.participantIn.map(study => study.id);
    // const policy = (me.info && me.info[study.id]) || 'preview';

    // const incrementalResultsInThisStudy = user.results
    //   .filter(
    //     result =>
    //       result.study &&
    //       result.study.id === study.id &&
    //       result.payload === 'incremental'
    //   )
    //   .map(result => result.task.id);
    //
    // console.log('incrementalResultsInThisStudy', incrementalResultsInThisStudy);

    const fullResultsInThisStudy = user.results
      .filter(
        result =>
          result.study &&
          result.study.id === study.id &&
          result.payload === 'full'
      )
      .map(result => result.task.id);

    console.log('fullResultsInThisStudy', fullResultsInThisStudy);

    if (studyIds.includes(study.id)) {
      // console.log('study.tasks', study.tasks);
      // const notCompletedTasks = study.tasks.filter(
      //   task =>
      //     !(
      //       fullResultsInThisStudy.includes(task.id) ||
      //       incrementalResultsInThisStudy.includes(task.id)
      //     )
      // );
      // let nextTask;
      // if (notCompletedTasks && notCompletedTasks.length) {
      //   nextTask = notCompletedTasks[0].id;
      // }
      // console.log('nextTask', nextTask);
      // if (this.props.redirect && nextTask) {
      //   Router.push({
      //     pathname: '/task/run',
      //     as: `/task/run`,
      //     query: {
      //       id: nextTask,
      //       policy: me.generalInfo.data,
      //       study: study.id,
      //       s: study.slug,
      //     },
      //   });
      // }

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
