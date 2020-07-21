import UpdateStudy from '../../components/Study/Edit/edit';
// import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateStudyPage = ({ query }) => (
  <Page>
    <UpdateStudy id={query.id} />
  </Page>
);

export default UpdateStudyPage;
