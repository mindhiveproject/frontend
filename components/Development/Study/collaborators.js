import React, { Component } from 'react';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import Avatar from 'react-avatar';

class Collaborators extends Component {
	render() {
    const {study} = this.props;
    const existingCollaborators = study?.collaborators || []; // just collaborator usernames
    const settings = study?.collaboratorProfiles?.map(c => c?.authEmail[0]?.settings) // getting settings
    console.log(existingCollaborators); //I'm now accessing the collaborator usernames here
    console.log(JSON.stringify(settings)); // getting settings
    const numCollaborators = existingCollaborators.length;
    let barWidth = '';
    // this switch needs to also change the relative position of the avatar circles to adjust to the length of the entire bar
    switch (numCollaborators){ 
      case 3:
        barWidth ='100px';
        break;
      case 2:
        barWidth ='80px';
        break;
      case 1:
        barWidth ='60px';
        break;
      default:
        barWidth ='120px';
        break;
    }
  	return (
          <div 
            style={{
              position: 'relative',
              backgroundColor: '#DEDEDE',
              borderRadius: '50px/60px',
              width: barWidth,
              height: '32px',
              padding: '3px'
            }}
          >
            <Avatar // can have a googleID attribute that you pass it
              name={existingCollaborators[0]} 
              googleId=""
              size="26px" 
              round={true}
              style={{
                position: 'absolute',
                left: '50%',
              }}
            /> 
            {numCollaborators > 1 &&
            <Avatar
              name={existingCollaborators[1]}
              size="26px"
              round={true}
              style={{
                position: 'absolute',                  
                left: '35%',
              }}
            />
            }
            {numCollaborators > 2 &&
            <Avatar
              name={existingCollaborators[2]}
              size="26px"
              round={true}
              style={{
                position: 'absolute',                  
                left: '20%',
              }}
            />
            }
            {numCollaborators > 3 &&
            <span
              style={{
                borderRadius: '50%',
                padding: '6px',
                position: 'absolute',
                left: '5%',                  
                backgroundColor: 'grey',
                width: '26px',
                height: '26px',
                fontSize: '.8em',
                fontWeight: 'bold' //not working???
              }}
            >
              <span
                style={{
                  fontSize: 'small'                
                }}
              > 
                <Dropdown
                  trigger={'+' + existingCollaborators.length} // this number is a reflection of how many > 3 collaborators there are
                  icon={null}
                  floating
                  simple // causes the dropdown to trigger on hover rather than click
                >                  
                  <Dropdown.Menu>
                    <Dropdown.Item>List of additional collaborators</Dropdown.Item>
                  </Dropdown.Menu>
                  {/* the dropdown displays the additional collaborators */}
                </Dropdown>
              </span>
            </span>
            }
            <span
              style={{
                position: 'absolute',
                left: '75%',
                padding: '6px'
              }}
            >
              <Icon 
                name='dropdown'
                style={{
                  cursor: 'pointer'
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