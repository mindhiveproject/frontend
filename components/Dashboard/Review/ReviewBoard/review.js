import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import moment from 'moment';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import Error from '../../../ErrorMessage/index';

import Proposal from '../../Jodit/proposal';
import ReviewQuestions from './questions';
import { CURRENT_USER_ID_QUERY } from '../../../User/index';

import StudyPage from '../../../StudyPage/index';
import TaskPage from '../../../Task/Run/index';

import IndividualReviews from './individual/wrapper';

const StyledFullReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 71px 1fr;
  grid-template-areas:
    'header header'
    'content review';
  height: 100vh;

  .header {
    grid-area: header;
    padding: 0rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 3rem;
    justify-content: flex-start;
    align-items: baseline;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
    font-size: 18px;
    .backBtn {
      cursor: pointer;
    }

    .discoverMenu {
      font-size: 18px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      cursor: pointer;
      .discoverMenuTitle {
        width: 150px;
        display: grid;
        justify-content: center;
        padding-bottom: 20px !important;
      }
      .selectedMenuTitle {
        border-bottom: 4px solid #ffc107 !important;
        p {
          color: #1a1a1a;
        }
      }
    }

    .headerLeft {
      display: grid;
      grid-template-columns: auto auto auto;
      justify-content: flex-start;
      align-items: baseline;
      grid-gap: 3rem;
    }
    .headerRight {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 9px;
      background: #ffffff;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 15px;
      align-items: center;
    }
  }
  .content {
    grid-area: content;
    background: #f7f9f8;
    padding: 1rem 2rem;
    overflow-y: scroll;
    overflow-x: scroll;
  }
  .review {
    grid-area: review;
    padding: 37px 44px 37px 50px;
    height: 100%;
    overflow-y: scroll;
  }
`;

const FULL_PROPOSAL_QUERY = gql`
  query FULL_PROPOSAL_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      reviews {
        id
        stage
        author {
          id
        }
        content
      }
      study {
        id
        title
        slug
      }
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          settings
          position
          section {
            id
          }
        }
      }
    }
  }
`;

class ReviewPage extends Component {
  state = {
    tab: this.props.tab || 'proposal',
    isTaskRunning: false,
    view: 'byQuestion',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  startTask = taskId => {
    if (taskId) {
      this.setState({
        taskId,
        isTaskRunning: true,
      });
    }
  };

  endTask = () => {
    this.setState({
      isTaskRunning: false,
    });
  };

  render() {
    const { proposalId, stage } = this.props;
    const { tab } = this.state;

    return (
      <Query query={FULL_PROPOSAL_QUERY} variables={{ id: proposalId }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data?.proposalBoard)
            return <p>No proposal found for {proposalId}</p>;
          const proposal = data.proposalBoard;

          const { title, description, sections } = proposal;
          const orderedSections = [...sections].sort(
            (a, b) => a.position - b.position
          );
          const allCardsContent = orderedSections.map(section => {
            const orderedCards = [...section.cards].sort(
              (a, b) => a.position - b.position
            );
            return orderedCards
              .filter(card => card?.settings?.status === 'Completed')
              .map(card =>
                [`<h3>${section.title} - `, `${card.title}</h3>`, card.content]
                  .flat()
                  .join('')
              );
          });

          const cardsContent = allCardsContent.flat().join('');
          let studyURL = '';
          if (proposal?.study?.slug) {
            studyURL = `<h3>Study URL: https://mindhive.science/studies/${proposal?.study?.slug}</h3>`;
          }
          const content = `<h1>${title}</h1><h2>${description}</h2>${studyURL}${cardsContent}`;

          return (
            <Query query={CURRENT_USER_ID_QUERY}>
              {userPayload => {
                const userPayloadError = userPayload.error;
                const userPayloadLoading = userPayload.loading;
                const userPayloadData = userPayload.data && userPayload.data.me;
                if (userPayloadError) return <Error error={userPayloadError} />;
                if (userPayloadLoading) return <p>Loading</p>;

                return (
                  <StyledFullReviewContainer>
                    <div className="header">
                      <div className="headerLeft">
                        <div className="backBtn" onClick={this.props.goBack}>
                          ← Exit{' '}
                          {stage === 'INDIVIDUAL' ? 'review' : 'synthesis'}
                        </div>
                        <div>{proposal?.study?.title}</div>

                        <div>
                          <Menu text stackable className="discoverMenu">
                            <Menu.Item
                              name="proposal"
                              active={tab === 'proposal'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'proposal'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Proposal</p>
                            </Menu.Item>

                            <Menu.Item
                              name="study"
                              active={tab === 'study'}
                              onClick={this.handleItemClick}
                              className={
                                tab === 'study'
                                  ? 'discoverMenuTitle selectedMenuTitle'
                                  : 'discoverMenuTitle'
                              }
                            >
                              <p>Study Page</p>
                            </Menu.Item>
                            {this.props.stage === 'SYNTHESIS' && (
                              <Menu.Item
                                name="reviews"
                                active={tab === 'reviews'}
                                onClick={this.handleItemClick}
                                className={
                                  tab === 'reviews'
                                    ? 'discoverMenuTitle selectedMenuTitle'
                                    : 'discoverMenuTitle'
                                }
                              >
                                <p>Reviews</p>
                              </Menu.Item>
                            )}
                          </Menu>
                        </div>
                      </div>
                      {this.props.stage === 'SYNTHESIS' &&
                        this.state.tab === 'reviews' && (
                          <div className="headerRight">
                            {this.state.view === 'byQuestion' && (
                              <img
                                width="20px"
                                src="/static/assets/view-question.png"
                              />
                            )}
                            {this.state.view === 'byReviewer' && (
                              <img
                                width="20px"
                                src="/static/assets/view-reviewer.png"
                              />
                            )}

                            <Dropdown
                              fluid
                              defaultValue={this.state.view}
                              options={[
                                {
                                  key: '1',
                                  text: 'Question view',
                                  value: 'byQuestion',
                                  image: {
                                    src: '/static/assets/view-question.png',
                                  },
                                },
                                {
                                  key: '2',
                                  text: 'Reviewer view',
                                  value: 'byReviewer',
                                  image: {
                                    src: '/static/assets/view-reviewer.png',
                                  },
                                },
                              ]}
                              onChange={(event, data) => {
                                this.setState({
                                  view: data.value,
                                });
                              }}
                            />
                          </div>
                        )}
                    </div>
                    <div className="content">
                      {this.state.tab === 'proposal' && (
                        <Proposal
                          onSubmit={async e => {
                            e.preventDefault();
                          }}
                          loading={loading}
                          title={title}
                          onTitleChange={() => {
                            // console.log('title change');
                          }}
                          content={content}
                          onContentChange={() => {
                            // console.log('content change');
                          }}
                          btnName="Save"
                          readonly
                          proposal
                        />
                      )}
                      {this.state.tab === 'study' && (
                        <StudyPage id={proposal?.study?.id} />
                      )}
                      {this.props.stage === 'SYNTHESIS' &&
                        this.state.tab === 'reviews' && (
                          <IndividualReviews
                            reviews={proposal.reviews.filter(
                              review => review.stage === 'INDIVIDUAL'
                            )}
                            view={this.state.view}
                          />
                        )}
                    </div>

                    <div className="review">
                      <ReviewQuestions
                        studyId={proposal?.study?.id}
                        proposalId={proposal.id}
                        authorId={userPayloadData.id}
                        goBack={this.props.goBack}
                        tab={this.state.tab}
                        networkClassIds={this.props.networkClassIds}
                        stage={this.props.stage}
                      />
                    </div>
                  </StyledFullReviewContainer>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default ReviewPage;
