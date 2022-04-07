import AllProtocols from '../../../components/Protocol/Board/all';
import AuthorizedPage from '../../../components/Page/userpage';

const DashboardIRBPage = props => (
  <AuthorizedPage>
    <AllProtocols tab="all" />
  </AuthorizedPage>
);

export default DashboardIRBPage;
