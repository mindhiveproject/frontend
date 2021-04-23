import React, { Component } from 'react';

import StudyDescription from './StudyRender/description';
import InfoTabs from './StudyRender/infoTabs';
import TaskCards from './StudyRender/taskCards';
import { StyledStudyPage } from '../Study/styles';

class StudyPage extends Component {
  render() {
    const { study, user } = this.props;

    const infoBlocks =
      study?.info?.reduce((acc, el) => {
        acc[el.name] = el.text;
        return acc;
      }, {}) || {};

    return (
      <StyledStudyPage>
        {study.image && (
          <div className="studyImage">
            <img src={study.image} alt={study.title} />
          </div>
        )}
        <StudyDescription study={study} />
        <InfoTabs study={study} infoBlocks={infoBlocks} />
        <TaskCards
          user={user}
          study={study}
          onStartTask={this.props.onStartTask}
        />
      </StyledStudyPage>
    );
  }
}

export default StudyPage;
