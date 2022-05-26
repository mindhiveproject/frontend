import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import InfoTabs from '../../Study/Landing/infoTabs';
import TaskTabs from './Task/taskTabs';

class StudyFrontPage extends Component {
  state = { activeTab: 'what' };

  handleItemClick = (e, { name }) => this.setState({ activeTab: name });

  render() {
    const {
      virtualUser,
      hasRegistered,
      study,
      onStartRegistration,
      onStartTheTask,
    } = this.props;
    const { activeTab } = this.state;

    // whether to show Participate button
    const showParticipateBtn = !study.settings?.hideParticipateButton;

    // parse study information
    const infoBlocks =
      study?.info?.reduce((acc, el) => {
        acc[el.name] = el.text;
        return acc;
      }, {}) || {};
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
          const src = i.file;
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

          {showParticipateBtn && !hasRegistered && (
            <button onClick={onStartRegistration}>Participate</button>
          )}

          {hasRegistered && (
            <TaskTabs
              user={virtualUser}
              study={study}
              onStartTheTask={onStartTheTask}
            />
          )}

          <InfoTabs infoBlocks={infoBlocks} study={study} />
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

export default StudyFrontPage;
