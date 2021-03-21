import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../User/index';

export const ContainerOnlyForAuthorsOrCollaborators = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return null;
      if (props.ids.includes(data.me.id)) {
        return props.children;
      }
      return false;
    }}
  </Query>
);
