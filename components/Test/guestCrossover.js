import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { OnboardingForm } from "../Study/styles";

class GuestCrossover extends Component {
  render() {
    const thankYouMessage =
      this.props.study.info &&
      this.props.study.info
        .filter((i) => i.name === "thankYouMessage" && i.text)
        .map((i) => i.text)
        .map((i) => ReactHtmlParser(i));

    // check whether there is a next task
    const isNextTask = this.props.nextTaskId;
    const { task } = this.props;

    return (
      <div>
        <OnboardingForm>
          {thankYouMessage}
          <div className="buttonsHolder">
            {isNextTask && (
              <button onClick={(e) => this.props.onSubmit(e, "nextTask")}>
                Proceed to the next task
              </button>
            )}
          </div>
          <p
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={(e) => this.props.onSubmit(e, "studyPage")}
          >
            Go back to the main study page
          </p>
        </OnboardingForm>
      </div>
    );
  }
}

export default GuestCrossover;
