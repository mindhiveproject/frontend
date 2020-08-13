import TaskResults from '../../components/Task/Results/index';
import Page from '../../components/Page/index';

const TaskResultsPage = ({ query }) => (
  <Page>
    <TaskResults id={query.id} />
  </Page>
);

export default TaskResultsPage;
