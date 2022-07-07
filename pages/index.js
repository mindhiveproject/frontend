import { Query } from '@apollo/client/react/components';
import Router from 'next/router';
import AllStudies from '../components/Study/Board/public';
import Page from '../components/Page/index';
import AuthorizedPage from '../components/Page/userpage';
import { USER_DASHBOARD_QUERY } from '../components/Queries/User';

const AllStudiesPage = props => (
  <Query query={USER_DASHBOARD_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading</p>;
      if (!data?.me)
        return (
          <Page>
            <AllStudies />
          </Page>
        );
      Router.push({
        pathname: '/dashboard',
      });
      return <AuthorizedPage />;
    }}
  </Query>
);

export default AllStudiesPage;
