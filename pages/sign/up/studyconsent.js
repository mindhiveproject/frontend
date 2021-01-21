import StudyUserWrapper from '../../../components/SignFlow/StudyUserWrapper';
import Page from '../../../components/Page/index';

const GetStartedPage = props => (
  <Page>
    <StudyUserWrapper {...props} step="studyconsent" />
  </Page>
);

export default GetStartedPage;
