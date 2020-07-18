import { useRouter } from 'next/router';
import EmailConfirm from '../../components/Confirm/Email/index';
import Page from '../../components/Page/index';

const EmailConfirmPage = () => {
  const router = useRouter();
  if (!(router.query.t && router.query.e))
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <EmailConfirm token={router.query.t} email={router.query.e} />
    </Page>
  );
};

export default EmailConfirmPage;
