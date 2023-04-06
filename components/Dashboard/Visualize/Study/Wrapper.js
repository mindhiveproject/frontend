import { useQuery } from "@apollo/client";

import styled from "styled-components";
import Preprocessor from "./Preprocessor";

import { MY_STUDY_SUMMARY_RESULTS_QUERY } from "../../../Queries/Result";
import { STUDY_SCRIPTS } from "../../../Queries/Script";

const StyledStudyResults = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: 10px 0px;
`;

export default function StudyWrapper({ user, studyId, goBack }) {
  // get the scripts
  const {
    data: scriptsData,
    error: scriptsError,
    loading: scriptsLoading,
  } = useQuery(STUDY_SCRIPTS, {
    variables: {
      id: studyId,
    },
  });

  const scripts = scriptsData?.scripts || [];

  // get the data
  const { data, error, loading } = useQuery(MY_STUDY_SUMMARY_RESULTS_QUERY, {
    variables: {
      id: studyId,
    },
  });

  const results = data?.summaryResults || [];

  return (
    <>
      <div className="goBackBtn">
        <span style={{ cursor: "pointer" }} onClick={goBack}>
          ← Back
        </span>
      </div>
      <StyledStudyResults>
        <Preprocessor data={results} user={user} scripts={scripts} />
      </StyledStudyResults>
    </>
  );
}
