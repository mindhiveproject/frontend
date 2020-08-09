import StudyResults from '../../components/Study/Results/index';
import Page from '../../components/Page/index';

const StudyResultsPage = ({ query }) => (
  <Page>
    <StudyResults id={query.id} />
  </Page>
);

export default StudyResultsPage;
