import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import UserWrapper from '../../components/Test/Wrappers/UserWrapper.js';

const RunTestPage = ({ query: { s, v } }) => {
  // s is a study id, v is a task version id
  // v is required as users can re-use the same tasks in one study
  const router = useRouter();
  // if either the test or study id are missing, return the error message
  if (!(router.query.v && router.query.s)) return <p>Loading</p>;
  return <UserWrapper s={router.query.s} v={router.query.v} />;
};

RunTestPage.propTypes = {
  query: PropTypes.object,
};

export default RunTestPage;
