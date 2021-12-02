import React, { Component } from 'react';
import FeaturedStudyCard from '../../Bank/Studies/featuredCard';

class StudyTab extends Component {
  render() {
    let selectedStudy;

    if (this.props.studies && this.props.studies.length && this.props.study) {
      selectedStudy = this.props.studies.filter(
        s => s.id === this.props.study
      )[0];
    }

    if (selectedStudy) {
      return (
        <FeaturedStudyCard
          study={selectedStudy}
          onSelectStudy={this.props.onSelectStudy}
        />
      );
    }
    return <></>;
  }
}

export default StudyTab;
