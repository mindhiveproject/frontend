import React, { Component } from "react";

// new components
import Proposal from "./Proposal/index";
import Builder from "./Builder/index";
import ParticipantPage from "./ParticipantPage/index";
import Review from "./Review/index";
import CollectSection from "../Development/Study/Collect/index";
// import DownloadSection from '../Development/Study/Download/index';
// import VisualizeSection from "../DataViz2.0/index";
import VisualizeSection from "../DataViz2.0/index";
import AnalyzeSection from "../Development/Study/Analyze/index";
import InDev from "./inDev";

export default class Page extends Component {
  render() {
    const { page, user } = this.props;
    const isAdmin = user?.permissions.includes("ADMIN");

    return (
      <>
        {page === "proposal" && <Proposal {...this.props} />}
        {page === "participant" && <ParticipantPage {...this.props} />}
        {page === "builder" && <Builder {...this.props} />}
        {page === "review" && <Review {...this.props} />}
        {page === "collect" && <CollectSection {...this.props} />}
        {page === "visualize" &&
          (isAdmin ? (
            <VisualizeSection id={this.props?.study?.id} {...this.props} />
          ) : (
            <InDev />
          ))}
        {page === "analyze" && <AnalyzeSection {...this.props} />}
      </>
    );
  }
}
