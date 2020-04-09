import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Center, ExperimentsList, StyledLink } from './styles';
import ExperimentCard from '../../ExperimentCard/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import TokenSignup from '../../Sign/Token/index';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_EXPERIMENTS_QUERY = gql`
  query ALL_EXPERIMENTS_QUERY {
    experiments {
      id
      title
      description
      image
      largeImage
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class Experiments extends Component {
  render() {
    return (
      <Center>
        <ContainerOnlyForNoProfile>
          <h2>
            Already signed up?
            <Link
              href={{
                pathname: '/login/token',
              }}
            >
              <StyledLink> Log in here </StyledLink>
            </Link>
            or
            <Link
              href={{
                pathname: '/sign/token',
              }}
            >
              <StyledLink> sign up as participant.</StyledLink>
            </Link>
          </h2>
          <p>
            You can also participate as a guest (we will assign you a different
            random username each time you participate).
          </p>
        </ContainerOnlyForNoProfile>

        <h1>Experiments</h1>
        <Query query={ALL_EXPERIMENTS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ExperimentsList>
                {data.experiments.map(experiment => (
                  <ExperimentCard experiment={experiment} key={experiment.id} />
                ))}
              </ExperimentsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Experiments;
export { ALL_EXPERIMENTS_QUERY };

// <ContainerOnlyForProfile>
//   <Link
//     href={{
//       pathname: '/bank/custom',
//     }}
//   >
//     <a>
//       <button>
//         <h2>All custom experiments</h2>
//       </button>
//     </a>
//   </Link>
// </ContainerOnlyForProfile>
// <ContainerOnlyForStudents>
//   <Link
//     href={{
//       pathname: '/bank/mycustom',
//     }}
//   >
//     <a>
//       <button>
//         <h2>My experiments</h2>
//       </button>
//     </a>
//   </Link>
// </ContainerOnlyForStudents>
