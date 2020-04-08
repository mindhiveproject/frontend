import ClassResults from '../../components/Class/Results/index';
import Page from '../../components/Page/index';

const ClassResultsPage = ({ query }) => (
  <Page>
    <ClassResults id={query.id} />
  </Page>
);

export default ClassResultsPage;
