import PreviewTask from '../../components/Task/FullPreview/index';

const PreviewTaskPage = ({ query }) => (
  <PreviewTask id={query.id} redirect={query.r} />
);

export default PreviewTaskPage;
