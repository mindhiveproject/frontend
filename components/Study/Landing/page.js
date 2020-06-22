import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import { Menu, Accordion } from 'semantic-ui-react';
import _ from 'lodash';
import faker from 'faker';
import ReactHtmlParser from 'react-html-parser';
import { StyledStudyPage, StyledLink, StyledButtons } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';

// import TaskCard from './task';
// import StudyRegistration from './registration';
// import StudyConsent from './consent';

// const CURRENT_USER_STUDIES = gql`
//   query CURRENT_USER_STUDIES {
//     me {
//       id
//       username
//       permissions
//       participantIn {
//         id
//       }
//     }
//   }
// `;

const panels = _.times(3, i => ({
  key: `panel-${i}`,
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
}));

class StudyParticipantPage extends Component {
  state = { activeItem: 'what' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { study } = this.props;
    const { activeItem } = this.state;
    console.log('study', study);
    return (
      <div>
        <StyledStudyPage>
          <Head>
            <title>mindHIVE | {study.title}</title>
          </Head>
          <div>
            <h2>{study.title}</h2>
            <p>{study.description}</p>
            <Link
              href={{
                pathname: `/studies/page`,
                query: { id: study.id },
              }}
            >
              <button>Take survey</button>
            </Link>

            <div className="studyDescription">
              <div className="descriptionMenu">
                <Menu tabular>
                  <Menu.Item
                    name="what"
                    active={activeItem === 'what'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="who"
                    active={activeItem === 'who'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="how"
                    active={activeItem === 'how'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </div>

              <div>
                {activeItem === 'what' && (
                  <div>
                    {study.info &&
                      study.info
                        .filter(i => i.name === 'what')
                        .map(i => ReactHtmlParser(i.text))}

                    <h2>FAQ</h2>
                    {false && (
                      <Accordion
                        defaultActiveIndex={[]}
                        panels={panels}
                        exclusive={false}
                        fluid
                      />
                    )}
                  </div>
                )}
              </div>
              <div>
                {activeItem === 'who' && (
                  <div>
                    {study.info &&
                      study.info
                        .filter(i => i.name === 'who')
                        .map(i => ReactHtmlParser(i.text))}
                  </div>
                )}
              </div>
              <div>
                {activeItem === 'how' && (
                  <div>
                    {study.info &&
                      study.info
                        .filter(i => i.name === 'how')
                        .map(i => ReactHtmlParser(i.text))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="studyInformationBoard">
            <div>
              <img src={study.image} alt={study.title} />
            </div>

            <div className="timeFrequency">
              <div>
                <div className="studyInformationHeader">Time to complete</div>
                <div>10 minutes</div>
              </div>

              <div>
                <div className="studyInformationHeader">Frequency</div>
                <div>Bi-weekly</div>
              </div>
            </div>

            <div className="studyInformationHeader">In partnership with</div>
            <div>Public Sentiment Berkely GRID</div>

            <div className="studyInformationHeader">Tags</div>
            <span>Environment</span>
            <span>Social brain</span>
            <div className="studyInformationHeader">Similar projects</div>
          </div>

          {false && (
            <>
              <ContainerOnlyForNoProfile>
                <StudyRegistration study={study} />
              </ContainerOnlyForNoProfile>

              <ContainerOnlyForProfile>
                <Query query={CURRENT_USER_STUDIES}>
                  {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading</p>;
                    if (!data.me)
                      return <p>No information found for your profile.</p>;
                    const { me } = data;
                    const studyIds = me.participantIn.map(study => study.id);
                    console.log('studyIds', studyIds);
                    if (studyIds.includes(study.id)) {
                      return (
                        <div>
                          {study.tasks &&
                            study.tasks.map((task, num) => (
                              <TaskCard key={num} task={task} />
                            ))}
                        </div>
                      );
                    }
                    return <StudyConsent study={study} id={study.id} />;
                  }}
                </Query>
              </ContainerOnlyForProfile>
            </>
          )}
        </StyledStudyPage>
      </div>
    );
  }
}

export default StudyParticipantPage;
// export { CURRENT_USER_STUDIES };
