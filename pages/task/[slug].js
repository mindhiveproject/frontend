import TaskParticipantPage from '../../components/Task/ParticipantPage/index';
import Page from '../../components/Page/index';

const TaskReviewParticipantPage = props => (
  <Page>
    <TaskParticipantPage slug={props.query.slug} />
  </Page>
);

export default TaskReviewParticipantPage;
