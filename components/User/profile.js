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
              <div className="image">
                <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" />
              </div>
              <div>
                <div>
                  <Icon name="map pin" />
                  Metropolis
                </div>
                <div className="snsLinks">
                  <p>https://www.metropolis.com/JoeLunchbucket</p>
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
                <p>https://my-personal-website.com/</p>
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
              <div>4 Liked</div>
              <div>2 Studies</div>
              <div>0 Classes</div>
            </div>

            <div className="fourthLine">
              <button>Follow</button>
              <button>Send a message</button>
            </div>
          </div>

          <div className="bioContainer">
            <div>
              <h2>Interests</h2>
              <span>Social Brain</span>
              <span>Psychology</span>
              <span>Environment</span>
            </div>

            <div>
              <h2>Bio</h2>The terms average Joe, ordinary Joe, Joe Sixpack, Joe
              Lunchbucket, Joe Snuffy, Joe Blow, Joe Schmo (for males) and
              ordinary Jane, average Jane, and plain Jane (for females), are
              used primarily in North America to refer to a completely average
              person, typically an average American. It can be used both to give
              the image of a hypothetical "completely average person" or to
              describe an existing person. Parallel terms in other languages for
              local equivalents exist worldwide.
            </div>
          </div>
        </div>

        <div className="display">
          <div>
            <h2>Researcher in</h2>
            {profile?.collaboratorInStudy.map(study => (
              <div className="studyDescriptionCard">
                <h3>{study?.title}</h3>
                <p>{study?.description}</p>
                <p>{study?.shortDescription}</p>
              </div>
            ))}
          </div>

          <div>
            <h2>Participant in</h2>
            {profile?.participantIn.map(study => (
              <p>{study?.title}</p>
            ))}
          </div>

          <div>
            <h2>Teacher in</h2>
            {profile?.teacherIn.map(theclass => (
              <p>{theclass?.title}</p>
            ))}
          </div>

          <div>
            <h2>Mentor in</h2>
            {profile?.mentorIn.map(theclass => (
              <p>{theclass?.title}</p>
            ))}
          </div>
        </div>
      </StyledAccount>
    );
  }
}

export default UserProfile;
