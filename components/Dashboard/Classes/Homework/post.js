import React, { Component } from "react";
import moment from "moment";
import { StyledPost, StyledJodit } from "./styles";
import { Jodit } from "../../Jodit/index";
import StatusForm from "../../Jodit/Forms/statusForm";

class Post extends Component {
  render() {
    const {
      content,
      settings,
      author,
      updatedAt,
      onContentChange,
      onSettingsChange,
      isAdmin,
      isEducationalResearcher,
    } = this.props;

    return (
      <StyledPost>
        <div className="proposalCardBoard">
          <div className="textBoard">
            <StyledJodit>
              <Jodit
                externalContent={content}
                updateContent={onContentChange}
              />
            </StyledJodit>
          </div>

          <div className="infoBoard">
            {!isEducationalResearcher && (
              <div>
                <h4>Assigned to</h4>
                <p>{author}</p>
              </div>
            )}

            <div>
              <h4>Last updated</h4>
              <p>{moment(updatedAt).format("MMM D, YYYY, h:mm a")}</p>
            </div>

            <div>
              <h4>Status</h4>
              {isEducationalResearcher ? (
                <div>{settings?.status}</div>
              ) : (
                <StatusForm
                  settings={settings}
                  onSettingsChange={onSettingsChange}
                />
              )}
            </div>

            <div className="proposalCardComments">
              <h4>Comments</h4>
              {isEducationalResearcher ? (
                <div>{settings?.comment}</div>
              ) : (
                <textarea
                  rows="13"
                  type="text"
                  id="comment"
                  name="comment"
                  value={settings?.comment}
                  onChange={(e) =>
                    onSettingsChange(e?.target?.name, e?.target?.value)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </StyledPost>
    );
  }
}

export default Post;
