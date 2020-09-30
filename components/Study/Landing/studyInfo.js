import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import { Menu, Accordion } from 'semantic-ui-react';

import { ContainerOnlyForNoProfile } from '../../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';
import { ContainerOnlyForParticipants } from '../../Permissions/Participant/index';
import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';
import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

import StudyTasks from './studyTasks';

class StudyInformation extends Component {
  state = { activeItem: 'what' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { study, user } = this.props;
    const { activeItem } = this.state;
    const studyIds = user?.participantIn?.map(study => study.id) || [];
    const joinedTheStudy = studyIds.includes(study.id);
    console.log('joinedTheStudy', joinedTheStudy);

    const faq =
      study.info &&
      study.info
        .filter(i => i.name.startsWith('faq') && i.text)
        .map(i => ({
          key: `panel-${i.name}`,
          title: i.header,
          content: ReactHtmlParser(i.text),
        }));
    const timeToComplete =
      study.info &&
      study.info
        .filter(i => i.name === 'time' && i.text)
        .map(i => i.text)
        .map(i => ReactHtmlParser(i));
    const frequency =
      study.info &&
      study.info
        .filter(i => i.name === 'frequency' && i.text)
        .map(i => i.text)
        .map(i => ReactHtmlParser(i));
    const partnership =
      study.info &&
      study.info
        .filter(i => i.name.startsWith('partners') && i.text)
        .map(i => {
          const src = `/content/studies/Brownsville/partners/${i.text}.svg`;
          return <img key={src} src={src} alt="icon" />;
        });
    const tags =
      study.info &&
      study.info
        .filter(i => i.name.startsWith('tag') && i.text)
        .map((i, n) => (
          <div className="studyTag" key={n}>
            {ReactHtmlParser(i.text)}
          </div>
        ));
    const contacts =
      study.info &&
      study.info
        .filter(i => i.name.startsWith('contact') && i.text)
        .map((i, n) => <div key={n}>{ReactHtmlParser(i.text)}</div>);
    const more =
      study.info &&
      study.info
        .filter(i => i.name === 'more')
        .map(i => ReactHtmlParser(i.text));

    return (
      <>
        {study.image && (
          <div className="studyImage">
            <img src={study.image} alt={study.title} />
          </div>
        )}

        <div className="studyTitleDescriptionBtns">
          <h1>{study.title}</h1>
          <div className="studyDescription">
            <h3>{ReactHtmlParser(study.description)}</h3>
          </div>

          <div className="controlBtns">
            <ContainerOnlyForNoProfile>
              <button onClick={this.props.onRegister}>Participate</button>
            </ContainerOnlyForNoProfile>

            <ContainerOnlyForProfile>
              {!studyIds.includes(study.id) && (
                <button onClick={this.props.onRegister}>Participate</button>
              )}
            </ContainerOnlyForProfile>

            <ContainerOnlyForScientists>
              <Link
                href={{
                  pathname: '/study/preview',
                  query: { id: study.id },
                }}
              >
                <button>Preview</button>
              </Link>
            </ContainerOnlyForScientists>
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
                <button className="secondaryBtn">Edit</button>
              </Link>
            </ContainerOnlyForAuthorizedCollaborators>
          </div>

          {joinedTheStudy && (
            <StudyTasks
              study={study}
              user={this.props.user || undefined}
              onStartTheTask={this.props.onStartTheTask}
              onStartExternalTask={this.props.onStartExternalTask}
            />
          )}

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
                {faq && faq.length ? (
                  <Menu.Item
                    name="FAQ"
                    active={activeItem === 'FAQ'}
                    onClick={this.handleItemClick}
                  />
                ) : (
                  <div></div>
                )}
                {more && more.length ? (
                  <Menu.Item
                    name="more"
                    active={activeItem === 'more'}
                    onClick={this.handleItemClick}
                  />
                ) : (
                  <div></div>
                )}
              </Menu>
            </div>

            <div>
              {activeItem === 'what' && (
                <div>
                  {study.info &&
                    study.info
                      .filter(i => i.name === 'what')
                      .map(i => ReactHtmlParser(i.text))}
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
            <div>
              {activeItem === 'FAQ' && (
                <div>
                  <Accordion
                    defaultActiveIndex={[]}
                    panels={faq}
                    exclusive={false}
                    fluid
                  />
                </div>
              )}
            </div>
            <div>{activeItem === 'more' && <div>{more}</div>}</div>
          </div>

          {!joinedTheStudy && (
            <StudyTasks
              study={study}
              user={this.props.user || undefined}
              onStartTheTask={this.props.onStartTheTask}
              onStartExternalTask={this.props.onStartExternalTask}
            />
          )}
        </div>

        <div className="studyInfoTimePartners">
          <div className="timeFrequency">
            {timeToComplete && timeToComplete.length ? (
              <div>
                <div className="studyInformationHeader">Time to complete</div>
                <div>{timeToComplete}</div>
              </div>
            ) : (
              <div></div>
            )}

            {frequency && frequency.length ? (
              <div>
                <div className="studyInformationHeader">Frequency</div>
                <div>{frequency}</div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {partnership && partnership.length ? (
            <div>
              <div className="studyInformationHeader">In partnership with</div>
              <div className="partnersInfo">{partnership}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="studyTagsContacts">
          {tags && tags.length ? (
            <div>
              <div className="studyInformationHeader">Tags</div>
              <div className="studyTags">{tags}</div>
            </div>
          ) : (
            <div></div>
          )}

          {contacts && contacts.length ? (
            <div>
              <div className="studyInformationHeader">Contact information</div>
              <div>{contacts}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default StudyInformation;
