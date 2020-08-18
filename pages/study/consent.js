import UpdateStudyConsent from '../../components/Study/Consent/edit';
import Page from '../../components/Page/index';

const UpdateStudyConsentPage = ({ query }) => (
  <Page>
    <UpdateStudyConsent id={query.id} />
  </Page>
);

export default UpdateStudyConsentPage;
