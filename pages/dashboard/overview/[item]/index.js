import DashboardOverview from '../../../../components/Dashboard/Overview/index';

const DashboardOverviewPage = ({ query }) => (
  <DashboardOverview
    tab={query.item || 'studies'}
    pagination={parseInt(query.page) || 1}
  />
);

export default DashboardOverviewPage;
