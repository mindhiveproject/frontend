import EditTask from '../../components/Task/Customize/edit';
import Page from '../../components/Page/index';

const EditTaskPage = ({ query }) => (
  <Page>
    <EditTask id={query.id} />
  </Page>
);

export default EditTaskPage;
