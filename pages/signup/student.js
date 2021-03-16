import { useRouter } from 'next/router';
import StudentSignup from '../../components/Sign/Student/index';
import Page from '../../components/Page/index';

const StudentSignupPage = () => {
  const router = useRouter();
  if (!router.query.c)
    return (
      <Page>
        <StudentSignup />
      </Page>
    );
  return (
    <Page>
      <StudentSignup classCode={router.query.c} />
    </Page>
  );
};

export default StudentSignupPage;
