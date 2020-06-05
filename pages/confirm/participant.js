import ParticipantConfirm from '../../components/Confirm/Participant/index';
import Page from '../../components/Page/index';

const ParticipantConfirmPage = props => (
  <Page>
    <ParticipantConfirm token={props.query.token} email={props.query.email} />
  </Page>
);

export default ParticipantConfirmPage;
