import { useRouter } from 'next/router';
import ReviewClass from '../../components/Class/Review/index';
import Page from '../../components/Page/index';

const ReviewClassPage = () => {
  const router = useRouter();
  if (!router.query.id)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <ReviewClass id={router.query.id} />
    </Page>
  );
};

export default ReviewClassPage;
