import DashboardChat from '../../components/Dashboard/Chat/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardChatPage = props => (
  <AuthorizedPage>
    <DashboardChat />
  </AuthorizedPage>
);

export default DashboardChatPage;
