import React, {Component, useState} from 'react';
import { Dropdown, Icon, Modal, Button } from 'semantic-ui-react';

import styled from 'styled-components';

import DeleteStudy from '../../Bank/Studies/delete';
import ToggleUserStudyHide from './toggleUserStudyHide';

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

const StyledModal = styled.div`
  display: grid;
  margin: 43px 51px;
  h3 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }
  .red {
    color: #D53533;
  }
`;

function ArchiveModal({study, isHidden}) {
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
          <StyledModal>
            <h3>Are you sure you want to <strong>archive</strong> this study?</h3>
            <p>Archiving a study allows you to focus on active studies. The study will be moved to an "Archived" section within your Develop area. It will not impact how others see the study. You can unarchive a study at any time.</p>
          </StyledModal>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => setOpen(false)}
        />
        <ToggleUserStudyHide
          style={{background: '#007C70', color: '#FFFFFF'}} //
          content="Active"                                  //
          onClick={() => setOpen(false)}                    //
        />
      </Modal.Actions>
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
              <p className='red'>Deleting a study deletes it for <em>all <br/>collaborators</em> on that study.</p> 
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <StyledModal>
            <h3>Are you sure you want to <strong>delete</strong> this study?</h3>
            <p>Deleting a study will <strong>permanently delete the study and all its data</strong> for you and all study collaborators. If you would like to keep your data you can archive the study. Archiving will move the study to an "Archived" section within your Develop area and keep the study active for all study collaborators. <span className='red'><strong>This action cannot be undone.</strong></span></p>
            <p><strong>Type "DELETE" to confirm</strong></p>
            <input></input>
          </StyledModal>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => setOpen(false)}
        />
        <Button 
          style={{background:"#D53533", color:"#FFFFFF"}}
          content="Delete"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
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
            <ArchiveModal
              study={this.props.study}
              isHidden={this.props.idHidden}
            />
            <DeleteModal 
              study={this.props.study}
            />
          </Dropdown.Menu>
        </Dropdown>
      </ArchiveDeleteDropdown>
    )
  };
};

export default ArchiveDelete;
