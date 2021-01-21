import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User/index';

export const ContainerOnlyForAuthorizedCollaborators = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (
        data.me &&
        (props.ids.includes(data.me.id) ||
          ((data.me.permissions.includes('SCIENTIST') ||
            data.me.permissions.includes('TEACHER')) &&
            data.me.id === props.id))
      ) {
        return props.children;
      }
      return false;
    }}
  </Query>
);
