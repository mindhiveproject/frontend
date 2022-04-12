import ViewProtocol from '../../../components/Protocol/view';
import AuthorizedPage from '../../../components/Page/userpage';

const ViewProtocolPage = ({ query }) => (
  <AuthorizedPage>
    <ViewProtocol id={query.id} />
  </AuthorizedPage>
);

export default ViewProtocolPage;
