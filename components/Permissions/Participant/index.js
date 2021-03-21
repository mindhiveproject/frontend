import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../User/index';

export const ContainerOnlyForParticipants = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (!data?.me || !data?.me.permissions.includes('PARTICIPANT')) {
        return false;
      }
      return props.children;
    }}
  </Query>
);

export const PageOnlyForParticipants = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (!data?.me || !data?.me.permissions.includes('PARTICIPANT')) {
        return (
          <div>
            <p>Please sign in as a participant in order to do that</p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);
