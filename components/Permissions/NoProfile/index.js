import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../Queries/User';

export const ContainerOnlyForNoProfile = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return null;
      if (data?.me) {
        return null;
      }
      return props.children;
    }}
  </Query>
);

export const PageOnlyForNoProfile = props => (
  <Query query={CURRENT_USER_EMAIL_QUERY}>
    {({ data, loading }) => {
      if (loading) return null;
      if (data?.me) {
        return (
          <div>
            <p>Please sign out in order to do that</p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);
