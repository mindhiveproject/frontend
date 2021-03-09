import { useRouter } from 'next/router';
import ParticipantSignup from '../../../components/Sign/Student/index';
import Page from '../../../components/Page/index';

const ParticipantSignupPage = () => {
  const router = useRouter();
  if (!router.query.code)
    return (
      <Page>
        <ParticipantSignup />
      </Page>
    );
  return (
    <Page>
      <ParticipantSignup classCode={router.query.code} />
    </Page>
  );
};

export default ParticipantSignupPage;
