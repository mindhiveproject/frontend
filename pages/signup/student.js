import { useRouter } from 'next/router';
import ParticipantSignup from '../../components/Sign/Student/index';
import Page from '../../components/Page/index';

const ParticipantSignupPage = () => {
  const router = useRouter();
  if (!router.query.c)
    return (
      <Page>
        <ParticipantSignup />
      </Page>
    );
  return (
    <Page>
      <ParticipantSignup classCode={router.query.c} />
    </Page>
  );
};

export default ParticipantSignupPage;
