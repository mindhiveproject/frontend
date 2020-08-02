import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, Accordion } from 'semantic-ui-react';
// import _ from 'lodash';
// import faker from 'faker';
import ReactHtmlParser from 'react-html-parser';
import { Query } from 'react-apollo';
import { StyledStudyPage, StyledLink, StyledButtons } from '../styles';
import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import RegistrationFlow from '../Registration/index';
// import TaskCard from '../TaskCard/index';
// import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

import CustomizedLandingPage from './customized';

class StudyParticipantPage extends Component {
  state = { activeItem: 'what', activePage: 'front' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { study } = this.props;
    const { activeItem } = this.state;
    const panels = this.props.study.info
      .filter(i => i.name.startsWith('faq'))
      .map(i => ({
        key: `panel-${i.name}`,
        title: i.header,
        content: ReactHtmlParser(i.text),
      }));
    // console.log('panels', panels);

    return (
      <>
        {this.state.activePage === 'front' && (
          <StyledStudyPage>
            <Head>
              <title>mindHIVE | {study.title}</title>
            </Head>

            <div className="studyImage">
              <img src={study.image} alt={study.title} />
            </div>

            <div className="studyTitleDescriptionBtns">
              <h1>{study.title}</h1>
              <h3>{study.description}</h3>
              <ContainerOnlyForAuthorizedCollaborators
                ids={study.collaborators && study.collaborators.map(c => c.id)}
                id={study.author && study.author.id}
              >
                <Link
                  href={{
                    pathname: '/study/edit',
                    query: { id: study.id },
                  }}
                >
                  <a>
                    <h2>
                      <button>Edit</button>
                    </h2>
                  </a>
                </Link>
              </ContainerOnlyForAuthorizedCollaborators>

              <ContainerOnlyForProfile>
                <CustomizedLandingPage
                  study={study}
                  onJoinStudy={() =>
                    this.setState({
                      activePage: 'registration',
                    })
                  }
                />
              </ContainerOnlyForProfile>

              <ContainerOnlyForNoProfile>
                <button
                  onClick={() =>
                    this.setState({
                      activePage: 'registration',
                    })
                  }
                >
                  Participate
                </button>
              </ContainerOnlyForNoProfile>
            </div>

            <div className="studyInfoTimePartners">
              <div className="timeFrequency">
                <div>
                  <div className="studyInformationHeader">Time to complete</div>
                  <div>
                    {study.info &&
                      study.info
                        .filter(i => i.name === 'time')
                        .map(i => ReactHtmlParser(i.text))}
                  </div>
                </div>

                <div>
                  <div className="studyInformationHeader">Frequency</div>
                  <div>
                    {study.info &&
                      study.info
                        .filter(i => i.name === 'frequency')
                        .map(i => ReactHtmlParser(i.text))}
                  </div>
                </div>
              </div>

              <div>
                <div className="studyInformationHeader">
                  In partnership with
                </div>
                <div className="partnersInfo">
                  {study.info &&
                    study.info
                      .filter(i => i.name.startsWith('partners'))
                      .map(i => {
                        const src = `/content/studies/Brownsville/partners/${i.text}.svg`;
                        return <img key={src} src={src} alt="icon" />;
                      })}
                </div>
              </div>
            </div>

            <div className="studyWhatWhoHow">
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
                    {true && (
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

            <div className="studyTagsContacts">
              <div>
                <div className="studyInformationHeader">Tags</div>
                <div className="studyTags">
                  {study.info &&
                    study.info
                      .filter(i => i.name.startsWith('tag'))
                      .map((i, n) => (
                        <div className="studyTag" key={n}>
                          {ReactHtmlParser(i.text)}
                        </div>
                      ))}
                </div>
              </div>

              <div>
                <div className="studyInformationHeader">
                  Contact information
                </div>
                <div>
                  {study.info &&
                    study.info
                      .filter(i => i.name.startsWith('contact'))
                      .map((i, n) => (
                        <div key={n}>{ReactHtmlParser(i.text)}</div>
                      ))}
                </div>
              </div>
            </div>
          </StyledStudyPage>
        )}
        {this.state.activePage === 'registration' && (
          <RegistrationFlow
            id={study.id}
            onClose={() => this.setState({ activePage: 'front' })}
          />
        )}
      </>
    );
  }
}

export default StudyParticipantPage;
