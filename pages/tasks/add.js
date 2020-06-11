import AddTask from '../../components/Task/Customize/create';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const AddTaskPage = ({ query }) => (
  <Page>
    <PageOnlyForScientists>
      <AddTask template={query.id} />
    </PageOnlyForScientists>
  </Page>
);

export default AddTaskPage;
