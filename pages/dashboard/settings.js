import DashboardSettings from '../../components/Dashboard/Settings/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardSettingsPage = props => (
  <AuthorizedPage>
    <DashboardSettings />
  </AuthorizedPage>
);

export default DashboardSettingsPage;
