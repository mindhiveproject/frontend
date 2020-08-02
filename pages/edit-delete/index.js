import EditCustomExperiment from '../../components/Experiment/Customize/edit';
import Page from '../../components/Page/index';

const EditCustomExperimentPage = ({ query }) => (
  <Page>
    <EditCustomExperiment id={query.id} />
  </Page>
);

export default EditCustomExperimentPage;
