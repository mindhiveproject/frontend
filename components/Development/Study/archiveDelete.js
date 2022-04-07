import React, {Component, useState} from 'react';
import { Dropdown, Icon, Modal, Button } from 'semantic-ui-react';

import styled from 'styled-components';

import DeleteStudy from '../../Bank/Studies/delete';

const ArchiveDeleteDropdown = styled.div`
  .archiveDropdown {
      width: 270px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.7);
      span {
      font-size: 16px;
      font-weight: bold;
      }
      p {
      color: #666666;
      line-height: 150%;
      font-size: 16px;
      }
      .heading {
      line-height: 200%;
      }
      .red {
      color: #D53533;
      }
  }
`;

function ArchiveModal() {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={
        <Dropdown.Item 
				  text={
            <>
              <div className="heading">
                <Icon name='archive' />
                <span>Archive Study</span>
              </div>
              <p>Archiving a study moves it to the <br/>"Archived" section in your Develop <br/>area. It will not impact how others <br/>see the study.</p> 
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <h3>Are you sure you want to <em>archive</em> this study?</h3>
            <p>Archiving a study allows you to focus on active studies. The study will be moved to an "Archived" section within your Develop area. It will not impact how others see the study. You can unarchive a study at any time.</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

function DeleteModal() {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={
        <Dropdown.Item 
          text={
            <>
              <div className="heading">
                <Icon name='trash' className='red' />
                <span className='red'>Delete Study</span>
              </div>
              <p className='red'>Deleting a study deletes it for all <br/>collaborators on that study.</p> 
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <h3>Are you sure you want to delete this study?</h3>
            <p>Deleting a study will <em>permanently delete the study and all its data</em> for you and all study collaborators. If you would like to keep your data you can archive the study. Archiving will move the study to an "Archived" section within your Develop area and keep the study active for all study collaborators. <em>This action cannot be undone.</em></p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
}


class ArchiveDelete extends Component {
  render() {

    return (
      <ArchiveDeleteDropdown className={this.props.className}>
        <Dropdown 
          button 
          icon='cog' 
          className="icon" 
          direction="left" 
          floating
          upward={false}
        >
        	<Dropdown.Menu className="archiveDropdown">
            <ArchiveModal />
            <DeleteModal />
          </Dropdown.Menu>
        </Dropdown>
      </ArchiveDeleteDropdown>
    )
  };
};

export default ArchiveDelete;
