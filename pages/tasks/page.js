import TaskPage from '../../components/Task/Page/index';
import Page from '../../components/Page/index';

const TaskReviewPage = props => (
  <Page>
    <TaskPage id={props.query.id} />
  </Page>
);

export default TaskReviewPage;
