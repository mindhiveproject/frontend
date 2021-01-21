import { useRouter } from 'next/router';
import StudyUserWrapper from '../../../components/SignFlow/StudyUserWrapper';
import Page from '../../../components/Page/index';

const GetStartedPage = props => {
  const router = useRouter();
  console.log('router.query', router);
  if (!router.query.id)
    return (
      <Page>
        <h1>Loading ...</h1>
      </Page>
    );
  return (
    <Page>
      <StudyUserWrapper query={router.query} step="getstarted" />
    </Page>
  );
};

export default GetStartedPage;
