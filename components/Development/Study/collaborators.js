import React, {Component, useState} from 'react';
import {Image, Modal, Dropdown, Icon} from 'semantic-ui-react';

function CollaboratorModal({}) {
  const [open, setOpen] = useState(false)
  return (
    <Modal // this is a button that opens a modal with all collaborators listed and an option to add
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Icon name='dropdown' />}
    >
      <Modal.Content>Modal Content</Modal.Content>
      {/* this must already exist somewhere */}
    </Modal>
  )
}

class Collaborators extends Component {

	render() {
  	return (

      <div 
        style={{
          position: 'relative',
          backgroundColor: '#DEDEDE',
          borderRadius: '50px/60px',
          width: '120px',
          height: '32px',
          padding: '2px'
        }}
      >
          <span 
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              padding: '6px',
              position: 'absolute',
              left: '50%',
              backgroundColor: 'red',
              width: '28px',
              height: '28px'
            }}
          >
            <span>SH</span>
          </span>
          <span
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              padding: '6px',
              position: 'absolute',
              left: '35%',
              backgroundColor: 'blue',
              width: '28px',
              height: '28px',
            }}
          >
            <span>LM</span>
          </span>
          <span
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              padding: '6px',
              position: 'absolute',
              left: '20%',
              backgroundColor: 'yellow',
              width: '28px',
              height: '28px'
            }}
          >
            RN
          </span>
          <span
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              padding: '6px',
              position: 'absolute',
              left: '5%',
              backgroundColor: 'grey',
              width: '28px',
              height: '28px'
            }}
          >
          <span // dropdown on hover; number is adaptive to # of collaborators
            style={{
              fontSize: 'small'
            }}
          > 
            <Dropdown
              trigger='+3'
              icon={null}
              floating
            >
              <Dropdown.Menu>
                <Dropdown.Item>List of additional collaborators</Dropdown.Item>
              </Dropdown.Menu>
              {/* the dropdown displays additional collaborators */}
            </Dropdown>
          </span>
          </span>
          <span
            style={{
              position: 'absolute',
              left: '80%',
              padding: '6px'
            }}
          >
            <CollaboratorModal />
          </span>
      </div>
  	);
	}
}

export default Collaborators;