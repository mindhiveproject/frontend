import Data from '../../components/Data/Results/index';
import Page from '../../components/Page/index';

const DataPage = ({ query }) => (
  <Page>
    <Data id={query.id} />
  </Page>
);

export default DataPage;
