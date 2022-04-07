import AddProtocol from '../../../components/Protocol/add';
import AuthorizedPage from '../../../components/Page/userpage';

const DashboardIRBPage = props => (
  <AuthorizedPage>
    <AddProtocol tab="add" />
  </AuthorizedPage>
);

export default DashboardIRBPage;
