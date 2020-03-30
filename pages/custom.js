import ReviewCustomExperiment from '../components/Experiment/CustomReview/index';
import Page from '../components/Page/index';

const CustomExperimentPage = props => (
  <Page>
    <ReviewCustomExperiment id={props.query.id} />
  </Page>
);

export default CustomExperimentPage;
