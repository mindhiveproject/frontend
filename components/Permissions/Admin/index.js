import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User/index';

export const ContainerOnlyForAdmin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (!data.me || !data.me.permissions.includes('ADMIN')) {
        return false;
      }
      return props.children;
    }}
  </Query>
);
