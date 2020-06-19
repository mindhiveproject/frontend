import CreateExternalTask from '../../components/Task/ExternalLink/create';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const CreateExternalTaskPage = () => (
  <Page>
    <PageOnlyForScientists>
      <CreateExternalTask />
    </PageOnlyForScientists>
  </Page>
);

export default CreateExternalTaskPage;
