import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

import PaginationStudyParticipants from "../../../Pagination/StudyParticipants";
import PaginationStudyGuestParticipants from "../../../Pagination/StudyGuestParticipants";

import ParticipantsOverview from "./Participants/overview";
import SinglePage from "./Participants/Single/index";
import SingleGuestPage from "./Participants/Single/guest";

import StyledMenu from "../../../Styles/StyledMenu";

import {
  StyledCollectSection,
  StyledCollectBoard,
} from "./Participants/styles";

// query to get all participants in the study
const PARTICIPANTS_IN_STUDY = gql`
  query PARTICIPANTS_IN_STUDY(
    $skip: Int
    $first: Int
    $search: String
    $studyId: ID!
  ) {
    participantsInStudy(
      skip: $skip
      first: $first
      where: {
        participantIn_some: { id: $studyId }
        OR: [
          { publicId_contains: $search }
          { publicReadableId_contains: $search }
        ]
      }
    ) {
      id
      publicReadableId
      publicId
      studiesInfo
      tasksInfo
      consentsInfo
      generalInfo
      consentGivenFor {
        id
        title
        description
        organization
      }
    }
  }
`;

// query to get all users
const GUEST_PARTICIPANTS_IN_STUDY = gql`
  query GUEST_PARTICIPANTS_IN_STUDY(
    $skip: Int
    $first: Int
    $search: String
    $studyId: ID!
  ) {
    guestParticipantsInStudy(
      skip: $skip
      first: $first
      where: {
        guestParticipantIn_some: { id: $studyId }
        OR: [
          { publicId_contains: $search }
          { publicReadableId_contains: $search }
        ]
      }
    ) {
      id
      publicReadableId
      publicId
      studiesInfo
      tasksInfo
      consentsInfo
      generalInfo
    }
  }
`;

class CollectWrapper extends Component {
  state = {
    view: this.props.view || "participants",
    page: this.props.page || 1,
    guestPage: this.props.guestPage || 1,
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

  render() {
    const { page, guestPage, view } = this.state;
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
          <div className="general">
            <p>
              Share the link below with your participants to invite them to join
              your study
            </p>
            <p>
              <h3>https://mindhive.science/studies/{this.props.study.slug}</h3>
            </p>
          </div>

          <div className="searchArea">
            <span>Search</span>
            <input
              type="text"
              name="keyword"
              value={this.state.keyword}
              onChange={this.saveToState}
            />
          </div>

          <StyledMenu>
            <div className="menu">
              <div
                onClick={() => this.setState({ view: "participants" })}
                className={
                  view === "participants"
                    ? "menuTitle selectedMenuTitle"
                    : "menuTitle"
                }
              >
                <p>Participants</p>
              </div>

              <div
                onClick={() => this.setState({ view: "guests" })}
                className={
                  view === "guests"
                    ? "menuTitle selectedMenuTitle"
                    : "menuTitle"
                }
              >
                <p>Guests</p>
              </div>
            </div>
          </StyledMenu>

          {view === "participants" && (
            <>
              <Query
                query={PARTICIPANTS_IN_STUDY}
                variables={{
                  skip: page * perPage - perPage,
                  first: perPage,
                  search: this.state.search,
                  studyId: this.props.study.id,
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading ...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  const { participantsInStudy } = data;
                  if (participantsInStudy.length === 0) {
                    return <h3>There are no participants in this study</h3>;
                  }
                  return (
                    <div>
                      {participantsInStudy.length > 0 && (
                        <PaginationStudyParticipants
                          page={page}
                          perPage={perPage}
                          search={this.state.search}
                          studyId={this.props.study.id}
                          changeToPage={this.changeToPage}
                        />
                      )}
                      <ParticipantsOverview
                        participants={participantsInStudy}
                        studyId={this.props.study.id}
                        openParticipant={this.openParticipant}
                        openGuestParticipant={this.openGuestParticipant}
                        consents={this.props.study.consent}
                      />
                      {participantsInStudy.length > 5 && (
                        <PaginationStudyParticipants
                          page={page}
                          perPage={perPage}
                          search={this.state.search}
                          studyId={this.props.study.id}
                          changeToPage={this.changeToPage}
                        />
                      )}
                    </div>
                  );
                }}
              </Query>
            </>
          )}

          {view === "guests" && (
            <>
              <Query
                query={GUEST_PARTICIPANTS_IN_STUDY}
                variables={{
                  skip: guestPage * perPage - perPage,
                  first: perPage,
                  search: this.state.search,
                  studyId: this.props.study.id,
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading ...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  const { guestParticipantsInStudy } = data;
                  if (guestParticipantsInStudy.length === 0) {
                    return (
                      <h3>There are no guest participants in this study</h3>
                    );
                  }
                  return (
                    <div>
                      {guestParticipantsInStudy.length > 0 && (
                        <PaginationStudyGuestParticipants
                          guestPage={guestPage}
                          perPage={perPage}
                          search={this.state.search}
                          studyId={this.props.study.id}
                          changeToPage={this.changeToPage}
                        />
                      )}
                      <ParticipantsOverview
                        participants={guestParticipantsInStudy}
                        studyId={this.props.study.id}
                        openParticipant={this.openParticipant}
                        openGuestParticipant={this.openGuestParticipant}
                        consents={this.props.study.consent}
                      />
                      {guestParticipantsInStudy.length > 5 && (
                        <PaginationStudyGuestParticipants
                          guestPage={guestPage}
                          perPage={perPage}
                          search={this.state.search}
                          studyId={this.props.study.id}
                          changeToPage={this.changeToPage}
                        />
                      )}
                    </div>
                  );
                }}
              </Query>
            </>
          )}
        </StyledCollectBoard>
      </StyledCollectSection>
    );
  }
}

export default CollectWrapper;
