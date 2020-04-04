import RunCustomExperiment from '../../components/Experiment/CustomRun/index';

const RunCustomExperimentPage = ({ query }) => (
  <RunCustomExperiment id={query.id} preview={query.preview} />
);

export default RunCustomExperimentPage;
