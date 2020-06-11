import ReviewStudyForParticipants from '../../components/Study/ParticipantPage/index';
import Page from '../../components/Page/index';

const StudyReviewParticipantsPage = props => (
  <Page>
    <ReviewStudyForParticipants slug={props.query.slug} />
  </Page>
);

export default StudyReviewParticipantsPage;
