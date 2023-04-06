import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ReactHtmlParser from "react-html-parser";

import styled from "styled-components";
import { StyledDasboard, StyledClassesDasboard } from "../styles";
import StyledFeaturedStudies, {
  StyledFeaturedStudyCard,
} from "../../Styles/StyledFeatured";

import AuthorizedPage from "../../Page/userpage";

import StudyWrapper from "./Study/Wrapper.js";

import { ALL_FEATURED_STUDIES_QUERY } from "../../Queries/Study";

const StyledRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  background: white;
  cursor: pointer;
`;

export default function DashboardVisualize({ user }) {
  const [studyId, setStudyId] = useState(null);

  const { data, error, loading } = useQuery(ALL_FEATURED_STUDIES_QUERY);

  const studies =
    data?.featuredStudies.filter(
      (study) => study?.scripts && study?.scripts.length
    ) || [];

  if (studyId) {
    return (
      <AuthorizedPage>
        <StyledDasboard>
          <StyledClassesDasboard>
            <StudyWrapper
              user={user}
              studyId={studyId}
              goBack={() => setStudyId(null)}
            />
          </StyledClassesDasboard>
        </StyledDasboard>
      </AuthorizedPage>
    );
  }
  return (
    <AuthorizedPage>
      <StyledDasboard>
        <StyledClassesDasboard>
          <div className="featuredHeader">
            <h1>Visualize study results</h1>
            <p></p>
          </div>

          <StyledFeaturedStudies>
            <div>
              {studies.map((study) => (
                <div style={{ background: "white", padding: "30px 40px" }}>
                  <div className="featuredContainerWrapper">
                    <div className="featuredContainer">
                      <StyledFeaturedStudyCard>
                        <div className="cardInfo">
                          <div className="cardMain">
                            <div className="studyFeatured">Featured</div>

                            <div className="studyHeader">
                              <h2>{study?.title}</h2>
                            </div>

                            <div className="studyDescription">
                              {ReactHtmlParser(study?.description)}
                            </div>
                          </div>
                          <div className="studyLink">
                            <button onClick={() => setStudyId(study?.id)}>
                              View results
                            </button>
                          </div>
                        </div>

                        <div className="studyImage">
                          {study.image ? (
                            <div>
                              <img src={study.image} alt={study.title} />
                            </div>
                          ) : (
                            <div className="noImage"></div>
                          )}
                        </div>
                      </StyledFeaturedStudyCard>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StyledFeaturedStudies>
        </StyledClassesDasboard>
      </StyledDasboard>
    </AuthorizedPage>
  );
}
