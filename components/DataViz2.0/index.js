import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { MY_STUDY_SUMMARY_RESULTS_QUERY } from "../Queries/Result";
import Preprocessor from "./Preprocessor";

const StyledDataViz = styled.div`
  display: grid;
  width: 100%;
  overflow-y: scroll;
`;

// get the data from the server
export default function DataViz({ id, user }) {
  const { data, error, loading } = useQuery(MY_STUDY_SUMMARY_RESULTS_QUERY, {
    variables: {
      id,
    },
  });

  const results = data?.summaryResults || [];

  return (
    <StyledDataViz>
      <Preprocessor studyId={id} data={results} user={user} />;
    </StyledDataViz>
  );
}
