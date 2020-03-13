import ReviewClass from '../../components/Class/Review/index';
import Page from '../../components/Page/index';

const ReviewClassPage = ({ query }) => (
  <Page>
    <ReviewClass id={query.id} />
  </Page>
);

export default ReviewClassPage;
