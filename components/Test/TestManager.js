import React, { Component } from "react";
import Router from "next/router";

import { ExperimentWindow } from "../Labjs/index";
import PostPrompt from "./PostPrompt";

import { StyledBox } from "../Task/Run/styles";

class TestManager extends Component {
  state = {
    page: "test", // two pages: test and post
    token: "", // token is used to find saved data in the dataset to modify them if needed
    dataIsSaved: false,
    dataSavingError: "",
  };

  closePostPrompt = () => {
    this.setState({
      page: "test",
    });
  };

  render() {
    const { user, study, test, version, guest } = this.props;
    const policy = "science";

    if (this.state.page === "test") {
      // check that the template id is present in the test
      if (test.template && test.template.id) {
        return (
          <StyledBox>
            <ExperimentWindow
              settings={{
                user: guest?.id ? null : user?.id,
                template: test?.template?.id,
                task: test?.id,
                study: study?.id,
                script: test?.template?.script,
                style: test?.template?.style,
                params: test?.parameters?.reduce((obj, item) => {
                  obj[item.name] = item.value;
                  return obj;
                }, {}),
                policy,
                eventCallback: (e) => {
                  // console.log('Event callback', e);
                },
                on_finish: (token) => {
                  if (policy === "preview" || !token) {
                    Router.push("/dashboard");
                  }
                  this.setState({
                    token,
                    page: "post",
                  });
                },
                version,
                guest: guest?.id,
                updateState: (update) => {
                  this.setState({
                    ...this.state,
                    ...update,
                  });
                },
              }}
            />
          </StyledBox>
        );
      }
    }

    if (this.state.page === "post") {
      return (
        <PostPrompt
          user={user}
          guest={guest}
          participant={guest || user}
          study={study}
          task={test}
          token={this.state.token}
          policy={policy}
          onClosePrompt={this.closePostPrompt}
          onStartTheTask={this.props.onStartTheTask} // missing
          onEndTask={this.props.onEndTask} // missing
          version={version}
          dataIsSaved={this.state.dataIsSaved}
          dataSavingError={this.state.dataSavingError}
        />
      );
    }

    return <h1>No test found</h1>;
  }
}

export default TestManager;
