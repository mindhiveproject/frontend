import { useRouter } from 'next/router';
import MyClasses from '../../../../components/Dashboard/Classes/index';

const StudyLandingPage = () => {
  const router = useRouter();
  if (!router.query.id) return <></>;
  return <MyClasses assignmentId={router.query.id} />;
};

export default StudyLandingPage;
