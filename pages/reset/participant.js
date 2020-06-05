import ParticipantReset from '../../components/Reset/Participant/index';
import Page from '../../components/Page/index';

const ParticipantResetPage = ({ query }) => (
  <Page>
    <ParticipantReset resetToken={query.resetToken} />
  </Page>
);

export default ParticipantResetPage;
