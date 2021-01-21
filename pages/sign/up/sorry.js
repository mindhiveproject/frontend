import StudyUserWrapper from '../../../components/SignFlow/StudyUserWrapper';
import Page from '../../../components/Page/index';

const GetStartedPage = props => (
  <Page>
    <StudyUserWrapper {...props} step="sorry" />
  </Page>
);

export default GetStartedPage;
