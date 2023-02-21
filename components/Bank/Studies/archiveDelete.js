import React, { Component, useState } from "react";
import { Dropdown, Icon, Modal, Button } from "semantic-ui-react";

import DeleteStudy from "./delete";
import ToggleUserStudyHide from "./toggleUserStudyHide";

import AuthorshipModal from "./manageAuthor";

import { StyledModal, ArchiveDeleteDropdown } from "../styles";

function ArchiveModal({ study, isHidden }) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Dropdown.Item
          text={
            <>
              <div className="heading">
                <Icon name="archive" />
                <span>{isHidden ? "Unarchive study" : "Archive Study"}</span>
              </div>
              {isHidden ? (
                <p style={{ padding: "5px" }}>
                  Unarchiving a study will return it
                  <br /> to the "Active" section in your
                  <br /> develop area. It will not impact <br />
                  how others see the study
                </p>
              ) : (
                <p style={{ padding: "5px" }}>
                  Archiving a study moves it to the <br />
                  "Archived" section in your <br />
                  Develop area. It will not impact <br />
                  how others see the study.
                </p>
              )}
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <StyledModal>
            <h3>
              Are you sure you want to{" "}
              <strong>{isHidden ? "unarchive" : "archive"}</strong> this study?
            </h3>
            {isHidden ? (
              <p>
                The study will be returned to the "Active" section within your
                Develop area. It will not impact how others see the study. You
                can rearchive a study at any time.
              </p>
            ) : (
              <p>
                Archiving a study allows you to focus on active studies. The
                study will be moved to an "Archived" section within your Develop
                area. It will not impact how others see the study. You can
                unarchive a study at any time.
              </p>
            )}
          </StyledModal>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => setOpen(false)} />
        <ToggleUserStudyHide
          id={study?.id}
          isHidden={isHidden}
          setOpen={setOpen}
        />
      </Modal.Actions>
    </Modal>
  );
}

function DeleteModal({ study }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({});

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Dropdown.Item
          text={
            <>
              <div className="heading">
                <Icon name="trash" className="red" />
                <span className="red">Delete Study</span>
              </div>
              <p style={{ padding: "5px" }} className="red">
                Deleting a study deletes it for{" "}
                <em>
                  all <br />
                  collaborators
                </em>{" "}
                on that study.
              </p>
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <StyledModal>
            <h3>
              Are you sure you want to <strong>delete</strong> this study?
            </h3>
            <p>
              Deleting a study will{" "}
              <strong>permanently delete the study and all its data</strong> for
              you and all study collaborators. If you would like to keep your
              data you can archive the study. Archiving will move the study to
              an "Archived" section within your Develop area and keep the study
              active for all study collaborators.{" "}
              <span className="red">
                <strong>This action cannot be undone.</strong>
              </span>
            </p>
            <div>
              <p>
                <strong>Type "DELETE" to confirm</strong>
              </p>
              <input type="text" onChange={handleChange} />
            </div>
          </StyledModal>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => setOpen(false)} />
        <DeleteStudy id={study?.id} setOpen={setOpen} inputValue={inputValue} />
      </Modal.Actions>
    </Modal>
  );
}

class ArchiveDelete extends Component {
  render() {
    const isAuthor = this.props.user?.id === this.props.study?.author?.id;

    return (
      <ArchiveDeleteDropdown className={this.props.className}>
        <Dropdown
          className="archiveDeleteIcon"
          direction="left"
          upward={false}
          icon={null}
          trigger={<img src="/content/icons/Settings.svg" />}
        >
          <Dropdown.Menu className="archiveDropdown">
            {this.props.isOnCard && (
              <Dropdown.Item
                onClick={() => this.props.openOldStudyBuilder(this.props.study)}
                text={
                  <>
                    <div className="heading">
                      <Icon name="settings" className="black" />
                      <span className="black">Open in the old builder</span>
                    </div>
                  </>
                }
              />
            )}
            {(isAuthor || this.props.overviewMode) && (
              <AuthorshipModal
                user={this.props.user}
                study={this.props.study}
              />
            )}
            {!this.props.overviewMode && (
              <>
                <ArchiveModal
                  study={this.props.study}
                  isHidden={this.props.isHidden}
                />
                <DeleteModal study={this.props.study} />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </ArchiveDeleteDropdown>
    );
  }
}

export default ArchiveDelete;
