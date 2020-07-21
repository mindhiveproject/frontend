import AddStudy from '../../components/Study/Edit/add';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const AddStudyPage = props => (
  <Page>
    <PageOnlyForScientists>
      <AddStudy />
    </PageOnlyForScientists>
  </Page>
);

export default AddStudyPage;
