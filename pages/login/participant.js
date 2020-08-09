import ParticipantLogin from '../../components/Login/Participant/index';
import Page from '../../components/Page/index';

const ParticipantLoginPage = props => (
  <Page>
    <ParticipantLogin task={props.query.task} redirect={props.query.study} />
  </Page>
);

export default ParticipantLoginPage;
