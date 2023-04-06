import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import styled from "styled-components";
import Error from "../ErrorMessage/index";
import Wrapper from "./wrapper";
import InDev from "../Development/Study/inDev";

import { MY_STUDY_SUMMARY_RESULTS_QUERY } from "../Queries/Result";

export const StyledVisualizer = styled.div`
  display: grid;
  width: 100%;
  overflow-y: scroll;
`;

class StudyResults extends Component {
  render() {
    const { id, user } = this.props;
    return (
      <StyledVisualizer>
        <Query query={MY_STUDY_SUMMARY_RESULTS_QUERY} variables={{ id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading ... </p>;
            if (!data.summaryResults)
              return <p>No study found for the id {id}</p>;
            const { summaryResults } = data;

            if (summaryResults.length === 0) {
              return (
                <InDev
                  header="No data to analyze yet"
                  message="Share the study link with participants or test yourself to generate data"
                />
              );
            }

            return <Wrapper results={summaryResults} user={user} />;
          }}
        </Query>
      </StyledVisualizer>
    );
  }
}

export default StudyResults;
