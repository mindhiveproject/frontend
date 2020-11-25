import Classes from '../../components/Class/Board/my';
import Page from '../../components/Page/index';
import { PageOnlyFor } from '../../components/Permissions/General/index';

const Home = props => (
  <PageOnlyFor roles={['TEACHER', 'ADMIN']}>
    <Page>
      <Classes />
    </Page>
  </PageOnlyFor>
);

export default Home;
