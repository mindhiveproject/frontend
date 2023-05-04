import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

import { StyledHeader, StyledButtons } from "../styles";

import TaskContent from "./Content";

class TaskModal extends Component {
  render() {
    const component = this.props?.component || {};
    const { user } = this.props;

    const isAuthor = component?.author?.id === user?.id;
    const isCollaborator = component?.collaborators
      .map((c) => c?.id)
      .includes(user?.id);

    const taskType =
      component?.taskType === "TASK"
        ? "task"
        : component?.taskType === "BLOCK"
        ? "block"
        : "survey";

    return (
      <Modal
        open
        closeOnDimmerClick
        size="large"
        onClose={() => this.props.onModalClose()}
      >
        <Modal.Header>
          <StyledHeader>
            <div>
              <h1>{component?.title}</h1>
              <p>{component?.description}</p>
            </div>
            <div className="rightPanel">
              <StyledButtons>
                <div>
                  <button
                    className="addBtn"
                    onClick={() => {
                      this.props.addComponentToCanvas({
                        name: component?.title,
                        details: component?.description,
                        componentID: component?.id,
                        taskType: component?.taskType,
                        subtitle: component?.subtitle,
                      });
                      this.props.onModalClose();
                    }}
                  >
                    Add to study
                  </button>
                </div>
                {(isAuthor || isCollaborator) && (
                  <div>
                    <button
                      className="previewBtn"
                      onClick={() => {
                        this.props.addComponentToCanvas({
                          name: component?.title,
                          details: component?.description,
                          componentID: component?.id,
                          taskType: component?.taskType,
                          subtitle: component?.subtitle,
                          createCopy: true,
                        });
                        this.props.onModalClose();
                      }}
                    >
                      Create a copy
                    </button>
                  </div>
                )}

                <div>
                  <button
                    className="previewBtn"
                    onClick={(e) => {
                      this.props.onModalClose();
                      this.props.onShowPreview(e, true);
                    }}
                  >
                    Preview {taskType}
                  </button>
                </div>
              </StyledButtons>
            </div>
          </StyledHeader>
        </Modal.Header>

        <Modal.Content style={{ padding: "0px", backgroundColor: "#E6E6E6" }}>
          <TaskContent component={component} />
        </Modal.Content>

        <Modal.Actions>
          <StyledButtons>
            <button
              className="closeBtn"
              onClick={() => this.props.onModalClose()}
            >
              Close
            </button>
          </StyledButtons>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TaskModal;
