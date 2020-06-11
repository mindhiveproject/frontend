import UpdateTemplate from '../../components/Template/edit';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateTemplatePage = ({ query }) => (
  <Page>
    <PageOnlyForScientists>
      <UpdateTemplate id={query.id} />
    </PageOnlyForScientists>
  </Page>
);

export default UpdateTemplatePage;
