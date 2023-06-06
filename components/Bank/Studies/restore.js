import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { Button } from "semantic-ui-react";

import { RESTORE_STUDY_MUTATION } from "../../Mutations/Study";

class RestoreStudy extends Component {
  render() {
    return (
      <Mutation
        mutation={RESTORE_STUDY_MUTATION}
        variables={{ id: this.props.id }}
      >
        {(restoreStudy, { error, loading }) => {
          if (loading) {
            return <div>updating...</div>;
          }
          return (
            <Button
              style={{ background: "#D53533", color: "#FFFFFF" }}
              content="Restore"
              onClick={() => {
                if (this.props.inputValue === "RESTORE") {
                  restoreStudy().catch((err) => {
                    alert(err.message);
                  });
                } else {
                  return alert("Please type RESTORE to delete your study");
                }
                this.props.setOpen(false);
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default RestoreStudy;
