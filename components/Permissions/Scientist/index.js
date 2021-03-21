import { Query } from '@apollo/client/react/components';
import { CURRENT_USER_QUERY } from '../../User/index';

export const ContainerOnlyForScientists = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (
        !data?.me ||
        !(
          data?.me.permissions.includes('SCIENTIST') ||
          data?.me.permissions.includes('TEACHER')
        )
      ) {
        return false;
      }
      return props.children;
    }}
  </Query>
);

export const ContainerOnlyForAuthorizedScientists = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (
        !data?.me ||
        !(
          data?.me.permissions.includes('SCIENTIST') ||
          data?.me.permissions.includes('TEACHER')
        ) ||
        data?.me.id !== props.id
      ) {
        return false;
      }
      return props.children;
    }}
  </Query>
);

export const PageOnlyForScientists = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p></p>;
      if (
        !data?.me ||
        !(
          data?.me.permissions.includes('SCIENTIST') ||
          data?.me.permissions.includes('TEACHER')
        )
      ) {
        return (
          <div>
            <p>Please sign in as a scientist in order to do that</p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);
