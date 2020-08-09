import MyTasks from '../../components/Task/Board/my';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const MyTasksPage = props => (
  <Page>
    <PageOnlyForScientists>
      <MyTasks />
    </PageOnlyForScientists>
  </Page>
);

export default MyTasksPage;
