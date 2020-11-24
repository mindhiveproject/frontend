import { useRouter } from 'next/router';
import ClassStudies from '../../components/Class/Studies/index';
import Page from '../../components/Page/index';
import { PageOnlyFor } from '../../components/Permissions/General/index';

const ClassStudiesPage = () => {
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
        <ClassStudies id={router.query.id} />
      </PageOnlyFor>
    </Page>
  );
};

export default ClassStudiesPage;
