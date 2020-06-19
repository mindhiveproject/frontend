import ReviewStudyForParticipants from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';

const StudyLandingPage = props => (
  <Page>
    <ReviewStudyForParticipants slug={props.query.slug} />
  </Page>
);

export default StudyLandingPage;
