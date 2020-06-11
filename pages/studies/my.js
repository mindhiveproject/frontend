import MyStudies from '../../components/Study/My/index';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const MyStudiesPage = props => (
  <Page>
    <PageOnlyForScientists>
      <MyStudies />
    </PageOnlyForScientists>
  </Page>
);

export default MyStudiesPage;
