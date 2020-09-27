import DashboardParticipate from '../../components/Dashboard/Participate/index';
import AuthorizedPage from '../../components/Page/userpage';

const DashboardParticipatePage = ({ query }) => (
  <DashboardParticipate tab={query.tab} />
);

export default DashboardParticipatePage;
