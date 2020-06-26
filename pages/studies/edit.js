import UpdateStudy from '../../components/Study/Edit/edit';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateStudyPage = ({ query }) => (
  <Page>
    <PageOnlyForScientists>
      <UpdateStudy id={query.id} />
    </PageOnlyForScientists>
  </Page>
);

export default UpdateStudyPage;
