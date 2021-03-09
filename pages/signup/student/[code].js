import { useRouter } from 'next/router';
import ParticipantSignupDirectLink from '../../../components/Sign/Student/directLink';
import Page from '../../../components/Page/index';

const ParticipantSignupDirectLinkPage = () => {
  const router = useRouter();
  if (!router.query.code)
    return (
      <Page>
        <ParticipantSignupDirectLink />
      </Page>
    );
  return (
    <Page>
      <ParticipantSignupDirectLink classCode={router.query.code} />
    </Page>
  );
};

export default ParticipantSignupDirectLinkPage;
