import ParticipantSignup from '../../components/Sign/Student/index';
import Page from '../../components/Page/index';

const ParticipantSignupPage = props => (
  <Page>
    <ParticipantSignup redirect={props.query.study} />
  </Page>
);

export default ParticipantSignupPage;
