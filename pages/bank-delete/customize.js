import CustomizeExperiment from '../../components/Experiment/Customize/create';
import { PageOnlyForProfile } from '../../components/Permissions/Profile/index';
import Page from '../../components/Page/index';

const CustomizeExperimentPage = ({ query }) => (
  <Page>
    <PageOnlyForProfile>
      <CustomizeExperiment id={query.id} />
    </PageOnlyForProfile>
  </Page>
);

export default CustomizeExperimentPage;
