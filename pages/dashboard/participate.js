import DashboardParticipate from '../../components/Dashboard/Participate/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardParticipatePage = props => (
  <AuthorizedPage>
    <DashboardParticipate />
  </AuthorizedPage>
);

export default DashboardParticipatePage;
