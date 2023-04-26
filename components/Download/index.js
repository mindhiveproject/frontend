import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import Error from "../ErrorMessage/index";
import Selector from "./selector";
import InDev from "../Development/Study/inDev";

import { MY_STUDY_RESULTS_QUERY } from "../Queries/Result";

class StudyResults extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query query={MY_STUDY_RESULTS_QUERY} variables={{ studyId: id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading ... </p>;
          if (!data.myStudyResults)
            return <p>No study found for the id {id}</p>;
          const { myStudyResults } = data;

          const resultsWithData = myStudyResults
            .filter(
              (result) => result?.fullData?.id || result?.incrementalData.length
            )
            .filter(
              (result) =>
                result.resultType === null || result.resultType !== "TEST"
            );

          if (resultsWithData.length === 0) {
            return (
              <InDev
                header="No data to download yet"
                message="Share the study link with participants or test yourself to generate data"
              />
            );
          }

          return <Selector myStudyResults={resultsWithData} />;
        }}
      </Query>
    );
  }
}

export default StudyResults;
