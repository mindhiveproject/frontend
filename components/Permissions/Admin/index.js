import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../Queries/User';

export const ContainerOnlyForAdmin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (!data?.me || !data?.me.permissions.includes('ADMIN')) {
        return false;
      }
      return props.children;
    }}
  </Query>
);
