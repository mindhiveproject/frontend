import DashboardStatic from '../../components/Dashboard/Page/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardPage = props => (
  <AuthorizedPage>
    <DashboardStatic />
  </AuthorizedPage>
);

export default DashboardPage;
