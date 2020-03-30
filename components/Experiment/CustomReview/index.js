import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import Error from '../../ErrorMessage/index';
import { StyledExperiment } from './styles';
import { CUSTOM_PARAMETER_QUERY } from '../CustomRun/index';

import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import EmptyTokenSignup from '../../Sign/Token/empty';

class ReviewCustomExperiment extends Component {
  render() {
    return (
      <Query query={CUSTOM_PARAMETER_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.parameter)
            return <p>No experiment found for {this.props.id}</p>;
          const exp = data.parameter;
          console.log('exp', exp);
          return (
            <StyledExperiment>
              <Head>
                <title>mindHIVE | {exp.title}</title>
              </Head>
              <h2>{exp.title}</h2>
              <div>
                <ContainerOnlyForNoProfile>
                  <EmptyTokenSignup experiment={exp} />
                </ContainerOnlyForNoProfile>

                <ContainerOnlyForProfile>
                  <Link
                    href={{
                      pathname: '/e',
                      query: { id: exp.id },
                    }}
                  >
                    <button>
                      <a>
                        <h2>Participate in experiment</h2>
                      </a>
                    </button>
                  </Link>
                </ContainerOnlyForProfile>
              </div>
            </StyledExperiment>
          );
        }}
      </Query>
    );
  }
}

export default ReviewCustomExperiment;
