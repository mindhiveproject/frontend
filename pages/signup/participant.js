import ParticipantSignup from '../../components/Sign/Participant/index';
import Page from '../../components/Page/index';

const ParticipantSignupPage = props => (
  <Page>
    <ParticipantSignup task={props.query.task} redirect={props.query.study} />
  </Page>
);

export default ParticipantSignupPage;
