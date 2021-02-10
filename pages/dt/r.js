import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import UserWrapper from '../../components/Test/Wrappers/UserWrapper.js';

const RunTestPage = ({ query: { t, s } }) => {
  // t is a test id, s is a study id
  const router = useRouter();
  // if either the test or study id are missing, return the error message
  if (!(router.query.t && router.query.s)) return <p>Loading</p>;
  return <UserWrapper t={router.query.t} s={router.query.s} />;
};

RunTestPage.propTypes = {
  query: PropTypes.object,
};

export default RunTestPage;
