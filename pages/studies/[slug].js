import { useRouter } from 'next/router';
import StudyLanding from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';

const StudyLandingPage = () => {
  const router = useRouter();
  if (!router.query.slug)
    return (
      <Page>
        <h1>Loading ...</h1>
      </Page>
    );
  return <StudyLanding {...router.query} />;
};

export default StudyLandingPage;
