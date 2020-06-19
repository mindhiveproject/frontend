import ReviewStudyForParticipants from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';

const StudyLandingPage = props => (
  <Page>
    <ReviewStudyForParticipants slug={props.query.slug} />
  </Page>
);

// make clean url for server-side rendering
// https://nextjs.org/learn/basics/dynamic-routes

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }
//
// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }

export default StudyLandingPage;
