import { useRouter } from 'next/router';
import ReviewStudyForParticipants, {
  REVIEW_STUDY_QUERY,
} from '../../components/Study/Landing/index';
import Page from '../../components/Page/index';
import { endpoint, prodEndpoint } from '../../config';
import { ALL_STUDIES_QUERY } from '../../components/Study/All/index';

const url = process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
// export default class StudyLandingPage extends React.Component {
//   static async getInitialProps({ req, query }) {
//     let data;
//     if (process.browser) {
//       console.log('I am in browser');
//       data = await getStudyInfo(query.slug);
//     } else {
//       console.log('I am in server');
//       data = await getStudyInfo(query.slug);
//     }
//     console.log('data', data);
//     const study = (data && data.study) || {};
//     // console.log('study', study);
//     return { study };
//   }
//
//   render() {
//     // console.log('this.props', this.props);
//     const { study } = this.props;
//     if (study) {
//       return (
//         <Page>
//           <ReviewStudyForParticipants study={study} />
//         </Page>
//       );
//     }
//     return (
//       <Page>
//         <div>No study found</div>
//       </Page>
//     );
//   }
// }

const StudyLandingPage = () => {
  const router = useRouter();
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

// const StudyLandingPage = props => {
//   const router = useRouter();
//   if (!router.query.study)
//     return (
//       <Page>
//         <h1>Not working</h1>
//       </Page>
//     );
//   return (
//     <Page>
//       <ReviewStudyForParticipants study={props.study} />
//     </Page>
//   );
// };

// make clean url for server-side rendering
// https://nextjs.org/learn/basics/dynamic-routes

// async function getAllStudies() {
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query: ALL_STUDIES_QUERY }),
//   });
//   const json = await res.json();
//   return json.data;
// }
//
// export async function getStaticPaths() {
//   const data = await getAllStudies();
//   const { studies } = data;
//   const paths = studies.map(study => ({
//     params: {
//       slug: study.slug,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }
//
// async function getStudyInfo(slug) {
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: REVIEW_STUDY_QUERY,
//       variables: { slug },
//     }),
//   });
//   const json = await res.json();
//   return json.data;
// }
//
// export async function getStaticProps({ params }) {
//   const data = await getStudyInfo(params.slug);
//   const { study } = data;
//   return {
//     props: {
//       study,
//     },
//   };
// }

export default StudyLandingPage;
