import { useRouter } from 'next/router';
import UserLanging from '../../components/User/landing';
import Page from '../../components/Page/index';

const UserLandingPage = () => {
  const router = useRouter();
  if (!router.query.username)
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  return (
    <Page>
      <UserLanging {...router.query} />
    </Page>
  );
};

export default UserLandingPage;
