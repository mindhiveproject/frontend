import { useRouter } from 'next/router';
import ClassStudies from '../../components/Class/Studies/index';
import Page from '../../components/Page/index';

const ClassStudiesPage = () => {
  const router = useRouter();
  if (!router.query.id)
    return (
      <Page>
        <p>Loading ...</p>
      </Page>
    );
  return (
    <Page>
      <ClassStudies id={router.query.id} />
    </Page>
  );
};

export default ClassStudiesPage;
