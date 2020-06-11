import MyTasks from '../../components/Task/My/index';
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
