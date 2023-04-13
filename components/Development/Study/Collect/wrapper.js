import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import debounce from "lodash.debounce";

import PaginationStudyParticipants from "../../../Pagination/StudyParticipants";
import ParticipantsOverview from "./Participants/overview";
import SinglePage from "./Participants/Single/index";
import SingleGuestPage from "./Participants/Single/guest";

import DownloadRawData from "./Download/RawData";
import DownloadSummaryData from "./Download/Summary";

import {
  StyledCollectSection,
  StyledCollectBoard,
} from "./Participants/styles";

import { STUDY_PARTICIPANTS } from "../../../Queries/Profile";

class CollectWrapper extends Component {
  state = {
    view: this.props.view || "participants",
    page: this.props.page || 1,
    keyword: "",
    participantId: null,
  };

  debouncedSearch = debounce((value) => {
    this.setState({
      search: value,
      page: 1,
      guestPage: 1,
    });
  }, 1000);

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.debouncedSearch(e.target.value);
  };

  changeToPage = (name, page) => {
    this.setState({
      [name]: page,
    });
  };

  openParticipant = (participantId) => {
    this.setState({
      view: "participant",
      participantId,
    });
  };

  openGuestParticipant = (participantId) => {
    this.setState({
      view: "guestParticipant",
      participantId,
    });
  };

  goBack = (view) => {
    this.setState({
      view,
      participantId: null,
    });
  };

  copyLink = () => {
    const copyLink = `https://mindhive.science/studies/${this.props.study.slug}`;
    const temp = document.createElement("input");
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand("copy");
    temp.remove();
    alert("The link is copied");
  };

  render() {
    const { page, view } = this.state;
    const { study } = this.props;
    const perPage = 20;

    if (view === "participant") {
      return (
        <SinglePage
          participantId={this.state.participantId}
          studyId={this.props.study.id}
          goBack={this.goBack}
        />
      );
    }

    if (view === "guestParticipant") {
      return (
        <SingleGuestPage
          participantId={this.state.participantId}
          studyId={this.props.study.id}
          goBack={this.goBack}
        />
      );
    }

    return (
      <StyledCollectSection>
        <StyledCollectBoard>
          <div className="header">
            <div className="study">
              <div>
                <p>
                  Share the link below with your participants to invite them to
                  join your study
                </p>
                <h3>
                  https://mindhive.science/studies/{this.props.study.slug}
                </h3>

                <div className="buttons">
                  <div>
                    <button onClick={() => this.copyLink()}>
                      Copy study link
                    </button>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      href={`https://mindhive.science/studies/${this.props.study.slug}`}
                      rel="noreferrer"
                    >
                      <button>Test your study</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="downloadOptions">
                <DownloadRawData study={study} />
                <DownloadSummaryData by="task" study={study} />
                <DownloadSummaryData by="participant" study={study} />
              </div>
            </div>
            <div className="searchArea">
              <input
                type="text"
                name="keyword"
                value={this.state.keyword}
                onChange={this.saveToState}
                placeholder="Search for participants"
              />
            </div>
          </div>

          <Query
            query={STUDY_PARTICIPANTS}
            variables={{
              studyId: this.props.study.id,
              search: this.state.search,
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { participantsInStudy } = data;
              if (participantsInStudy.length === 0) {
                return <h3>There are no participants in this study</h3>;
              }
              const count = participantsInStudy.length;
              let orderedParticipants = participantsInStudy;
              const consents = this.props.study.consent || [];

              if (consents.length && consents[0].id) {
                const consentId = consents[0].id;
                orderedParticipants = [...participantsInStudy].sort((a, b) => {
                  const timeA = a?.consentsInfo[consentId]?.createdAt || 0;
                  const timeB = b?.consentsInfo[consentId]?.createdAt || 0;
                  return timeA > timeB ? -1 : 1;
                });
              }

              const participants = orderedParticipants.slice(
                page * perPage - perPage,
                page * perPage
              );

              return (
                <div className="participants">
                  {count > 0 && (
                    <PaginationStudyParticipants
                      page={page}
                      perPage={perPage}
                      changeToPage={this.changeToPage}
                      count={count}
                    />
                  )}
                  <ParticipantsOverview
                    participants={participants}
                    studyId={this.props.study.id}
                    openParticipant={this.openParticipant}
                    openGuestParticipant={this.openGuestParticipant}
                    consents={this.props.study.consent}
                  />
                  {count > 5 && (
                    <PaginationStudyParticipants
                      page={page}
                      perPage={perPage}
                      changeToPage={this.changeToPage}
                      count={count}
                    />
                  )}
                </div>
              );
            }}
          </Query>
        </StyledCollectBoard>
      </StyledCollectSection>
    );
  }
}

export default CollectWrapper;
