import RunCustomExperiment from '../../components/Experiment/CustomRun/index';

const RunCustomExperimentPage = ({ query }) => (
  <RunCustomExperiment id={query.id} dataPolicy={query.data} />
);

export default RunCustomExperimentPage;
