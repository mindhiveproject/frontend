import ForkTask from '../../components/Task/Fork/index';
import Page from '../../components/Page/index';

const ForkTaskPage = ({ query }) => (
  <Page>
    <ForkTask id={query.id} />
  </Page>
);

export default ForkTaskPage;
