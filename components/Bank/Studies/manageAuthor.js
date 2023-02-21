import React, { useState } from "react";
import { Dropdown, Icon, Modal, Button } from "semantic-ui-react";

import { Mutation } from "@apollo/client/react/components";
import { StyledModal } from "../styles";
import FindAuthor from "./findAuthor";

import { CHANGE_STUDY_AUTHOR } from "../../Mutations/Study";
import { MY_DEVELOPED_STUDIES_QUERY } from "./developed";

export default function AuthorshipModal({ user, study }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(study?.author?.username);
  const [confirmation, setConfirmation] = useState("");

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
                <Icon name="signup" />
                <span>Transfer the authorship</span>
              </div>
            </>
          }
        />
      }
    >
      <Modal.Content>
        <Modal.Description>
          <StyledModal>
            <h3>
              Are you sure you want to <strong>transfer the authorship</strong>{" "}
              of this study?
            </h3>
            <p>
              Transfering your authorship will{" "}
              <strong>permanently delete</strong> the connection between your
              account and the study.
              <span className="red">
                <strong> This action cannot be undone.</strong>
              </span>
            </p>
            <div>
              <FindAuthor username={username} setUsername={setUsername} />
            </div>
            <div>
              <h2>Type "CHANGE" to confirm</h2>
              <input
                type="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
          </StyledModal>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => setOpen(false)} />
        <Mutation
          mutation={CHANGE_STUDY_AUTHOR}
          variables={{ id: study?.id, username }}
          refetchQueries={[{ query: MY_DEVELOPED_STUDIES_QUERY }]}
        >
          {(changeStudyAuthor, { error, loading }) => {
            if (loading) {
              return <div>Updating...</div>;
            }
            return (
              <Button
                style={{ background: "#D53533", color: "#FFFFFF" }}
                content="Change"
                onClick={() => {
                  if (confirmation === "CHANGE") {
                    changeStudyAuthor().catch((err) => {
                      alert(err.message);
                    });
                  } else {
                    return alert(
                      "Please type CHANGE to change the author of your study"
                    );
                  }
                  setOpen(false);
                }}
              />
            );
          }}
        </Mutation>
      </Modal.Actions>
    </Modal>
  );
}
