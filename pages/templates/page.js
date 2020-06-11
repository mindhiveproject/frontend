import TemplatePage from '../../components/Template/Page/index';
import Page from '../../components/Page/index';

const TemplateReviewPage = props => (
  <Page>
    <TemplatePage id={props.query.id} />
  </Page>
);

export default TemplateReviewPage;
