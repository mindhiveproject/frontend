import DashboardVisualize from "../../components/Dashboard/Visualize/index";

const DashboardVisualizePage = ({ query }) => (
  <DashboardVisualize tab={query.tab} />
);

export default DashboardVisualizePage;
