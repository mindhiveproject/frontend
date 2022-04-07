import MyProtocols from '../../components/Protocol/Board/my';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const MyProtocolsPage = props => (
  <Page>
    <PageOnlyForScientists>
      <MyProtocols tab="my" />
    </PageOnlyForScientists>
  </Page>
);

export default MyProtocolsPage;
