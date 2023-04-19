import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import styled from "styled-components";

import Error from "../../../../ErrorMessage/index";
import { CreateAccountForm } from "../../../../Sign/styles";

import { UPDATE_USER_ACCOUNT } from "../../../../Mutations/User";
import { STUDENT_QUERY } from "../../../../Queries/User";

const StyledSettingsDasboard = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1rem;
`;

class Settings extends Component {
  state = {
    permissions: this.props?.user?.permissions,
  };

  setPermissions = (e) => {
    const { name } = e?.target;
    let permissions;
    if (this.state.permissions.includes(name)) {
      permissions = this.state.permissions.filter((p) => p !== name);
    } else {
      permissions = [...this.state.permissions, name];
    }
    this.setState({
      permissions,
    });
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;

    return (
      <Mutation
        mutation={UPDATE_USER_ACCOUNT}
        variables={{
          id: user?.id,
        }}
        refetchQueries={[{ query: STUDENT_QUERY, variables: { id: user?.id } }]}
      >
        {(editAccount, { error, loading }) => (
          <StyledSettingsDasboard>
            <CreateAccountForm
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await editAccount({
                  variables: {
                    permissions: this.state.permissions,
                  },
                });
                alert("The account information was updated");
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>User permissions</h2>
                <Error error={error} />

                {[
                  "PARTICIPANT",
                  "STUDENT",
                  "TEACHER",
                  "MENTOR",
                  "SCIENTIST",
                  "ADMIN",
                  "IT",
                ].map((role) => (
                  <div>
                    <label htmlFor={role}>
                      <div className="checkboxField">
                        <input
                          type="checkbox"
                          id={role}
                          name={role}
                          checked={permissions.includes(role)}
                          onChange={this.setPermissions}
                        />
                        <span>
                          {role === "IT" ? "EDUCATIONAL RESEARCHER" : role}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}

                <button type="submit">Update account</button>
              </fieldset>
            </CreateAccountForm>
          </StyledSettingsDasboard>
        )}
      </Mutation>
    );
  }
}

export default Settings;
