import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../User/index';

export const PageOnlyFor = props => {
  const { roles } = props || [];
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p></p>;
        if (
          data?.me &&
          roles.some(role => data?.me?.permissions.includes(role))
        ) {
          return props.children;
        }
        return false;
      }}
    </Query>
  );
};
