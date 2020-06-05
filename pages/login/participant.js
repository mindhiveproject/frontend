import ParticipantLogin from '../../components/Login/Participant/index';
import Page from '../../components/Page/index';

const ParticipantLoginPage = props => (
  <Page>
    <ParticipantLogin redirect={props.query.exp} />
  </Page>
);

export default ParticipantLoginPage;
