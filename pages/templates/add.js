import AddTemplate from '../../components/Template/add';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const AddTaskTemplatePage = props => (
  <Page>
    <PageOnlyForScientists>
      <AddTemplate />
    </PageOnlyForScientists>
  </Page>
);

export default AddTaskTemplatePage;
