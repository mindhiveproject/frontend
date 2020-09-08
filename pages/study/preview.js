import PreviewStudy from '../../components/Study/Preview/index';
import Page from '../../components/Page/index';

const PreviewStudyPage = ({ query }) => (
  <Page>
    <PreviewStudy id={query.id} />
  </Page>
);

export default PreviewStudyPage;
