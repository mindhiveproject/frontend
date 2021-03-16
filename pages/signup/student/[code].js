import { useRouter } from 'next/router';
import StudentSignupDirectLink from '../../../components/Sign/Student/directLink';
import Page from '../../../components/Page/index';

const StudentSignupDirectLinkPage = () => {
  const router = useRouter();
  if (!router.query.code)
    return (
      <Page>
        <StudentSignupDirectLink />
      </Page>
    );
  return (
    <Page>
      <StudentSignupDirectLink classCode={router.query.code} />
    </Page>
  );
};

export default StudentSignupDirectLinkPage;
