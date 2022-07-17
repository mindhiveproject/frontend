import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import Avatar from 'react-avatar';

class Collaborators extends Component {
  render() {
    const { study } = this.props;
    const existingCollaborators = study?.collaborators || []; // provides only the collaborators' usernames
    const profImages = study?.collaboratorProfiles?.map(c =>
      c.authEmail[0]?.settings?.googleAuth
        ? c.authEmail[0].settings.googleAuth.picture
        : ''
    );
    const numCollaborators = existingCollaborators.length;
    const remainingNumCollaborators = numCollaborators - 3;
    const remainingCollaborators = existingCollaborators.filter(
      c => existingCollaborators.indexOf(c) > 2
    );
    let barWidth = '';
    let firstAvatarPosition = '';
    let secondAvatarPosition = '';
    let thirdAvatarPosition = '';
    let dropdownPosition = '';
    // changes the width of the collaborator bar and the relative position of the avatar circles within the bar
    switch (numCollaborators) {
      case 1:
        barWidth = '50px';
        firstAvatarPosition = '10%';
        dropdownPosition = '65%';
        break;
      case 2:
        barWidth = '75px';
        secondAvatarPosition = '7%';
        firstAvatarPosition = '37%';
        dropdownPosition = '75%';
        break;
      case 3:
        barWidth = '100px';
        thirdAvatarPosition = '6%';
        secondAvatarPosition = '29%';
        firstAvatarPosition = '52%';
        dropdownPosition = '80%';
        break;
      default:
        barWidth = '125px';
        thirdAvatarPosition = '5%';
        secondAvatarPosition = '24%';
        firstAvatarPosition = '43%';
        dropdownPosition = '85%';
        break;
    }
    return (
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#F3F5F6',
          borderRadius: '50px/60px',
          width: barWidth,
          height: '42px',
          padding: '3px',
        }}
      >
        {numCollaborators > 3 && (
          <span
            style={{
              borderRadius: '50%',
              padding: '6px',
              position: 'absolute',
              left: '62%',
              backgroundColor: 'grey',
              width: '24px',
              height: '24px',
              fontSize: '.8em',
            }}
          >
            <span
              style={{
                fontSize: numCollaborators < 10 ? 'small' : 'smaller',
                fontWeight: 'bold',
              }}
            >
              <Dropdown
                trigger={`+${remainingNumCollaborators}`}
                icon={null}
                floating
                simple // causes the dropdown to trigger on hover rather than click
              >
                <Dropdown.Menu>
                  {remainingCollaborators.map(c => (
                    <Dropdown.Item>{c}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </span>
        )}
        <Avatar
          name={existingCollaborators[0]}
          src={profImages?.length && profImages[0]}
          maxInitials={2}
          size="26px"
          textSizeRatio={1.5}
          round
          style={{
            position: 'absolute',
            left: firstAvatarPosition,
          }}
        />
        {numCollaborators > 1 && (
          <Avatar
            name={existingCollaborators[1]}
            src={profImages[1]}
            maxInitials={2}
            size="26px"
            textSizeRatio={1.5}
            round
            style={{
              position: 'absolute',
              left: secondAvatarPosition,
            }}
          />
        )}
        {numCollaborators > 2 && (
          <Avatar
            name={existingCollaborators[2]}
            src={profImages[2]}
            maxInitials={2}
            size="26px"
            textSizeRatio={1.5}
            round
            style={{
              position: 'absolute',
              left: thirdAvatarPosition,
            }}
          />
        )}
        <span
          style={{
            position: 'absolute',
            bottom: '25%',
            left: dropdownPosition,
          }}
        >
          <Icon
            name="dropdown"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              this.props.openSharingModal();
            }}
          />
        </span>
      </div>
    );
  }
}

export default Collaborators;
