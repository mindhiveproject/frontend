import StudyParticipants from '../../components/Study/Participants/index';
import Page from '../../components/Page/index';

const StudyParticipantsPage = ({ query }) => (
  <Page>
    <StudyParticipants id={query.id} />
  </Page>
);

export default StudyParticipantsPage;
