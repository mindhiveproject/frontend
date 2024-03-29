import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../Queries/User';

export const ContainerOnlyForAuthorizedCollaborators = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (
        data?.me &&
        (props.ids.includes(data?.me.id) ||
          ((data?.me.permissions.includes('SCIENTIST') ||
            data?.me.permissions.includes('TEACHER')) &&
            data?.me.id === props.id))
      ) {
        return props.children;
      }
      return false;
    }}
  </Query>
);
