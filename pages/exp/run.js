import RunExperiment from '../../components/Experiment/Run/index';

const RunExperimentPage = ({ query }) => (
  <RunExperiment experimentId={query.id} preview={query.preview} />
);

export default RunExperimentPage;
