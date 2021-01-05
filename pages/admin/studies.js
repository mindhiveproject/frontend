import { useRouter } from 'next/router';
import AllStudies from '../../components/Study/List/index';
import Page from '../../components/Page/index';
import { PageOnlyFor } from '../../components/Permissions/General/index';

const AllStudiesPage = () => (
  // const router = useRouter();
  // if (!router.query.id)
  //   return (
  //     <PageOnlyFor roles={['ADMIN']}>
  //       <Page>
  //         <p>Loading ...</p>
  //       </Page>
  //     </PageOnlyFor>
  //   );
  <Page>
    <PageOnlyFor roles={['ADMIN']}>
      <AllStudies />
    </PageOnlyFor>
  </Page>
);
export default AllStudiesPage;
