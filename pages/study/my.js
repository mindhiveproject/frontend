import MyStudies from '../../components/Study/Board/my';
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
