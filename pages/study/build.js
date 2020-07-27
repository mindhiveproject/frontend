import BuildStudy from '../../components/Study/Build/index';
// import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const BuildStudyPage = props => (
  <Page>
    <BuildStudy id={props.query.id} />
  </Page>
);

export default BuildStudyPage;
