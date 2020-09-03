import { useRouter } from 'next/router';
import ReviewStudyForParticipants from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';

const StudyLandingPage = () => {
  const router = useRouter();
  if (!router.query.slug)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return <ReviewStudyForParticipants slug={router.query.slug} />;
};

export default StudyLandingPage;
