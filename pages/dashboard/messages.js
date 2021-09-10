import DashboardMessages from '../../components/Dashboard/Messages/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardMessagesPage = props => (
  <AuthorizedPage>
    <DashboardMessages />
  </AuthorizedPage>
);

export default DashboardMessagesPage;
