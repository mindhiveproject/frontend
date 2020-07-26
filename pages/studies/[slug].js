import { useRouter } from 'next/router';
import ReviewStudyForParticipants from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';

const StudyLandingPage = () => {
  const router = useRouter();
  console.log('router.query.slug', router.query.slug);
  if (!router.query.slug)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <ReviewStudyForParticipants slug={router.query.slug} />
    </Page>
  );
};

export default StudyLandingPage;
