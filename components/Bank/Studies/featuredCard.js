import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { StyledFeaturedStudyCard } from '../styles';

class FeaturedStudyCard extends Component {
  render() {
    const { study, user } = this.props;

    const { description } = study;
    let publicCardDescription;
    if (description) {
      if (description.split(' ').length > 50) {
        publicCardDescription = `${description
          .split(' ')
          .slice(0, 50)
          .join(' ')} ...`;
      } else {
        publicCardDescription = description;
      }
    }

    return (
      <StyledFeaturedStudyCard>
        <div className="cardInfo">
          <div className="cardMain">
            <div className="studyFeatured">Featured</div>

            <div className="studyHeader">
              <h2>{study.title}</h2>
            </div>

            <div className="studyDescription">
              {ReactHtmlParser(publicCardDescription)}
            </div>
          </div>
          <div className="studyLink">
            <button
              onClick={() => {
                this.props.onSelectStudy(study);
              }}
            >
              Go to study
            </button>
          </div>
        </div>

        <div className="studyImage">
          {study.image ? (
            <img src={study.image} alt={study.title} />
          ) : (
            <div className="noImage"></div>
          )}
        </div>
      </StyledFeaturedStudyCard>
    );
  }
}

export default FeaturedStudyCard;