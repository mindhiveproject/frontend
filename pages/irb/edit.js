import UpdateProtocol from '../../components/Protocol/edit';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateProtocolPage = ({ query }) => (
  <Page>
    <PageOnlyForScientists>
      <UpdateProtocol id={query.id} />
    </PageOnlyForScientists>
  </Page>
);

export default UpdateProtocolPage;
