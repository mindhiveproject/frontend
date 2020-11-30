import { useRouter } from 'next/router';
import ClassResults from '../../components/Class/Results/index';
import Page from '../../components/Page/index';
import { PageOnlyFor } from '../../components/Permissions/General/index';

const ClassResultsPage = () => {
  const router = useRouter();
  if (!router.query.id)
    return (
      <PageOnlyFor roles={['TEACHER', 'ADMIN']}>
        <Page>
          <p>Loading ...</p>
        </Page>
      </PageOnlyFor>
    );
  return (
    <Page>
      <PageOnlyFor roles={['TEACHER', 'ADMIN']}>
        <ClassResults id={router.query.id} />
      </PageOnlyFor>
    </Page>
  );
};

export default ClassResultsPage;
