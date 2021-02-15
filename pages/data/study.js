import { useRouter } from 'next/router';
import Data from '../../components/DataViz/index';

const DataPage = () => {
  const router = useRouter();
  if (!router.query.id) return <p>Loading...</p>;
  return <Data id={router.query.id} />;
};

export default DataPage;
