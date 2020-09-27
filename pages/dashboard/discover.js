import DashboardDiscover from '../../components/Dashboard/Discover/index';

const DashboardDiscoverPage = ({ query }) => (
  <DashboardDiscover tab={query.tab} />
);

export default DashboardDiscoverPage;
