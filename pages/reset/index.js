import { useRouter } from 'next/router';
import Reset from '../../components/Reset/index';
import Page from '../../components/Page/index';

const ResetPage = () => {
  const router = useRouter();
  if (!router.query.t)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <Reset resetToken={router.query.t} />
    </Page>
  );
};

export default ResetPage;
