import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Link from 'next/link';
import Error from '../ErrorMessage/index';

import { StyledPublicUserPage } from './styles';

import Profile from './profile';

import { PUBLIC_PROFILE_QUERY } from '../Queries/Profile';

class UserLandingPage extends Component {
  render() {
    return (
      <StyledPublicUserPage>
        <Query
          query={PUBLIC_PROFILE_QUERY}
          variables={{ username: this.props.username }}
        >
          {profilePayload => {
            const profilePayloadError = profilePayload.error;
            const profilePayloadLoading = profilePayload.loading;
            const profilePayloadData =
              profilePayload.data && profilePayload.data.profile;
            if (profilePayloadError)
              return <Error error={profilePayloadError} />;
            if (profilePayloadLoading) return <p>Loading</p>;

            console.log('profilePayloadData', profilePayloadData);
            if (!profilePayloadData)
              return (
                <div>
                  <h1>No public profile found</h1>
                  <Link
                    href={{
                      pathname: '/',
                    }}
                  >
                    <a>
                      <p>Check the list of public profiles</p>
                    </a>
                  </Link>
                </div>
              );
            return <Profile profile={profilePayloadData} />;
          }}
        </Query>
      </StyledPublicUserPage>
    );
  }
}

export default UserLandingPage;
