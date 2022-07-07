import React, { Component } from 'react';
import Head from 'next/head';
import { Card, Flag, Icon, Menu } from 'semantic-ui-react';
import { StyledAccount } from './styles';

class UserProfile extends Component {
  render() {
    const { profile } = this.props;
    return (
      <StyledAccount>
        <Head>
          <title> MindHive | {profile?.username}</title>
        </Head>

        <div className="profile">
          <div className="profileContainer">
            <div className="firstLine">
              <div>Profile image</div>
              <div>
                <div>
                  <Icon name="map pin" />
                  Location
                </div>
                <div className="snsLinks">
                  <p>SNS links</p>
                  {profile?.authEmail?.email && (
                    <div className="snsLink">
                      <a
                        href={`mailto:${profile?.authEmail?.email}?subject=PrettySpecial`}
                      >
                        <img
                          src="/static/icons/sns/publicMail.svg"
                          height="30"
                        />
                      </a>
                    </div>
                  )}
                </div>
                <p>Website link</p>
              </div>
            </div>

            <div className="secondLine">
              <div className="username">
                <h1>{profile?.username}</h1>
              </div>
              <div />
            </div>

            <div className="thirdLine">
              <div>2 Followers</div>
              <div>0 Following</div>
              <div>0 Liked</div>
              <div>1 Created</div>
              <div>0 Collections</div>
            </div>

            <div className="fourthLine">
              <p>Follow button</p>

              <p>Write a message button</p>
            </div>
          </div>

          <div className="bioContainer">
            <div>Profile bio</div>
          </div>
        </div>

        <div className="display">Display of things</div>
      </StyledAccount>
    );
  }
}

export default UserProfile;
