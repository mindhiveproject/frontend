import DashboardHome from '../../components/Dashboard/Home/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardHomePage = props => (
  <AuthorizedPage>
    <DashboardHome />
  </AuthorizedPage>
);

export default DashboardHomePage;
