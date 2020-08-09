import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../User/index';

// export const ContainerOnlyForCollaborators = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading }) => {
//       if (loading) return <p></p>;
//       if (!data.me || !data.me.permissions.includes('SCIENTIST')) {
//         return false;
//       }
//       return props.children;
//     }}
//   </Query>
// );

export const ContainerOnlyForAuthorizedCollaborators = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      console.log('props', props);
      console.log('data.me', data.me);
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

// export const PageOnlyForCollaborators = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading }) => {
//       if (loading) return <p></p>;
//       if (!data.me || !props.ids.includes(data.me.id)) {
//         return (
//           <div>
//             <p>Please sign in as a scientist in order to do that</p>
//           </div>
//         );
//       }
//       return props.children;
//     }}
//   </Query>
// );
