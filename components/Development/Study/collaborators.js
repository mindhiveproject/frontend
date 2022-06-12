import React, { Component } from "react";
import { Image, Dropdown, Icon } from "semantic-ui-react";
import Avatar from "react-avatar";

class Collaborators extends Component {
  render() {
    const { study } = this.props;
    const existingCollaborators = study?.collaborators || []; // provides only the collaborators' usernames
    const settings = study?.collaboratorProfiles?.map(
      (c) => c?.authEmail[0]?.settings
    );
    console.log(existingCollaborators);
    console.log(JSON.stringify(settings)); // can access settings, no googleAuth found
    const numCollaborators = existingCollaborators.length;
    const remainingNumCollaborators = numCollaborators - 3;
    const remainingCollaborators = existingCollaborators.filter(
      (c) => existingCollaborators.indexOf(c) > 2
    );
    let barWidth = "";
    let firstAvatarPosition = "";
    let secondAvatarPosition = "";
    let thirdAvatarPosition = "";
    let dropdownPosition = "";
    // changes the width of the collaborator bar and the relative position of the avatar circles within the bar
    switch (numCollaborators) {
      case 3:
        barWidth = "100px";
        firstAvatarPosition = "5%";
        secondAvatarPosition = "25%";
        thirdAvatarPosition = "45%";
        dropdownPosition = "75%";
        break;
      case 2:
        barWidth = "80px";
        secondAvatarPosition = "7%";
        thirdAvatarPosition = "30%";
        dropdownPosition = "70%";
        break;
      case 1:
        barWidth = "60px";
        thirdAvatarPosition = "10%";
        dropdownPosition = "60%";
        break;
      default:
        barWidth = "120px";
        firstAvatarPosition = "20%";
        secondAvatarPosition = "35%";
        thirdAvatarPosition = "50%";
        dropdownPosition = "80%";
        break;
    }
    return (
      <div
        style={{
          position: "relative",
          backgroundColor: "#DEDEDE",
          borderRadius: "50px/60px",
          width: barWidth,
          height: "32px",
          padding: "3px",
        }}
      >
        <Avatar
          name={existingCollaborators[0]}
          googleId="" // can have a googleID as an attribute, which allows it to access a profile image
          size="26px"
          round={true}
          style={{
            position: "absolute",
            left: thirdAvatarPosition,
          }}
        />
        {numCollaborators > 1 && (
          <Avatar
            name={existingCollaborators[1]}
            size="26px"
            round={true}
            style={{
              position: "absolute",
              left: secondAvatarPosition,
            }}
          />
        )}
        {numCollaborators > 2 && (
          <Avatar
            name={existingCollaborators[2]}
            size="26px"
            round={true}
            style={{
              position: "absolute",
              left: firstAvatarPosition,
            }}
          />
        )}
        {numCollaborators > 3 && (
          <span
            style={{
              borderRadius: "50%",
              padding: "6px",
              position: "absolute",
              left: "5%",
              backgroundColor: "grey",
              width: "26px",
              height: "26px",
              fontSize: ".8em",
            }}
          >
            <span
              style={{
                fontSize: numCollaborators < 10 ? "small" : "smaller",
                fontWeight: "bold",
              }}
            >
              <Dropdown
                trigger={"+" + remainingNumCollaborators}
                icon={null}
                floating
                simple // causes the dropdown to trigger on hover rather than click
              >
                <Dropdown.Menu>
                  {remainingCollaborators.map((c) => (
                    <Dropdown.Item>{c}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </span>
        )}
        <span
          style={{
            position: "absolute",
            bottom: "25%",
            left: dropdownPosition,
          }}
        >
          <Icon
            name="dropdown"
            style={{
              cursor: "pointer",
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
