import UpdateProtocol from '../../../components/Protocol/edit';
import AuthorizedPage from '../../../components/Page/userpage';

const DashboardIRBPage = ({ query }) => (
  <AuthorizedPage>
    <UpdateProtocol id={query.id} />
  </AuthorizedPage>
);

export default DashboardIRBPage;
