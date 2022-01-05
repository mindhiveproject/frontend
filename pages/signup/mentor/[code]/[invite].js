import { useRouter } from 'next/router';
import MentorSignupDirectLink from '../../../../components/Sign/Mentor/directLink';
import Page from '../../../../components/Page/index';

const MentorSignupDirectLinkPage = () => {
  const router = useRouter();
  if (!router.query.code) return <Page></Page>;
  if (!router.query.invite) return <Page></Page>;
  return (
    <Page>
      <MentorSignupDirectLink
        classCode={router.query.code}
        invite={router.query.invite}
      />
    </Page>
  );
};

export default MentorSignupDirectLinkPage;
