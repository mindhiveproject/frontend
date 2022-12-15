import React, { Component } from 'react';
import { StyledHomeDasboard } from '../styles';
import Updates from './updates';
import Links from './links';

class HomeDashboard extends Component {
  render() {
    const { me, studies, username, publicId, publicReadableId } = this.props;

    return (
      <StyledHomeDasboard>
        <h1>Welcome{username && `, ${username}`}!</h1>

        <div className="header">
          <div className="idInfo">
            <div>
              {publicId && (
                <div>
                  Participant ID <div className="code">{publicId}</div>
                </div>
              )}
            </div>

            <div>
              {publicReadableId && (
                <div>
                  Public readable ID{' '}
                  <div className="code">{publicReadableId}</div>
                </div>
              )}
            </div>
          </div>

          <div>
            Permissions
            {me?.permissions.map((permission, num) => (
              <div key={num} className="code">
                {permission}
              </div>
            ))}
          </div>
        </div>

        <Updates />
        <Links />
      </StyledHomeDasboard>
    );
  }
}

export default HomeDashboard;
