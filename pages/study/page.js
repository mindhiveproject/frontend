import StudyPage from '../../components/Study/Page/index';
import Page from '../../components/Page/index';

const StudyReviewPage = props => (
  <Page>
    <StudyPage id={props.query.id} />
  </Page>
);

export default StudyReviewPage;
