import RunTask from '../../components/Task/Run/index';

const RunTaskPage = ({ query }) => (
  <RunTask id={query.id} policy={query.policy} />
);

export default RunTaskPage;
