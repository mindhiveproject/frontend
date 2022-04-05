import React, {Component} from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

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
                <Dropdown.Item text={
                  <>
                    <div className="heading">
                      <Icon name='archive' />
                      <span>Archive Study</span>
                    </div>
                    <p>Archiving a study moves it to the <br/>"Archived" section in your Develop <br/>area. It will not impact how others <br/>see the study.</p> 
                  </>
                  }
                  onClick={() => {
                    //open archiveModal
                  }}
                />
                <Dropdown.Item 
                  text={
                  <>
                    <div className="heading">
                      <Icon name='trash' className="red"/>
                      <span className="red">Delete Study</span>
                    </div>
                    <p className="red">Deleting a study deletes it for all <br/>collaborators on that study.</p>
                  </>
                  }
                  onClick={() => {
                    //open deleteModal
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </ArchiveDeleteDropdown>
        )
    }
}

export default ArchiveDelete;