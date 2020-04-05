import RunExperiment from '../../components/Experiment/Run/index';

const RunExperimentPage = ({ query }) => (
  <RunExperiment experimentId={query.id} dataPolicy={query.data} />
);

export default RunExperimentPage;
