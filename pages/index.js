import AllStudies from '../components/Study/Board/public';
import Page from '../components/Page/index';
import AuthorizedPage from '../components/Page/userpage';
import { Query } from '@apollo/client/react/components';
import { USER_DASHBOARD_QUERY } from '../components/User/index';
import Router from 'next/router';

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
        return <AuthorizedPage />
    }}
  </Query>
);

export default AllStudiesPage;
