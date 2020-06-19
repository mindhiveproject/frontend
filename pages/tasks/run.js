import RunTask from '../../components/Task/Run/index';

const RunTaskPage = ({ query }) => (
  <RunTask id={query.id} policy={query.policy} study={query.study} />
);

export default RunTaskPage;
