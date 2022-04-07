import MyProtocols from '../../../components/Protocol/Board/my';
import AuthorizedPage from '../../../components/Page/userpage';

const DashboardIRBPage = props => (
  <AuthorizedPage>
    <MyProtocols tab="my" />
  </AuthorizedPage>
);

export default DashboardIRBPage;
