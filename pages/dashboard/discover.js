import DashboardDiscover from '../../components/Dashboard/Discover/personal';

const DashboardDiscoverPage = ({ query }) => (
  <DashboardDiscover tab={query.tab} />
);

export default DashboardDiscoverPage;
