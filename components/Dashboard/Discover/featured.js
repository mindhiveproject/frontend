import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import StyledFeaturedStudies from '../../Styles/StyledFeatured';

import StudyTab from './studyTab';

import { ALL_FEATURED_STUDIES_QUERY } from '../../Queries/Study';

class FeaturedStudies extends Component {
  state = {
    study: undefined,
  };

  componentDidMount() {
    if (this.props?.studies.length && this.props.studies[0].id) {
      this.setState({
        study: this.props.studies[0].id,
      });
    }
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <StyledFeaturedStudies>
        <div className="featuredHeader">
          <h1>Discover studies, tasks and surveys</h1>
          <p>
            Browse our collection of studies, tasks and surveys created by high
            school students in the MindHive program and partner scientists.
            Participate in studies or preview tasks and surveys.
          </p>
        </div>

        <div className="featuredContainerWrapper">
          <div className="featuredContainer">
            <StudyTab
              study={this.state.study}
              studies={this.props.studies}
              onSelectStudy={this.props.onSelectStudy}
            />
          </div>

          <div className="buttonsWrapper">
            <div className="buttons">
              {this.props.studies.map(study => (
                <input
                  key={study.id}
                  type="radio"
                  name="featuredStudy"
                  value={study.id}
                  checked={this.state.study === study.id}
                  onChange={() => {
                    this.setState({ study: study.id });
                  }}
                  // onClick={() => {
                  //   this.setState({ study: study.id });
                  // }}
                  autoFocus={this.state.study === study.id}
                />
              ))}
            </div>
          </div>
        </div>
      </StyledFeaturedStudies>
    );
  }
}

class Featured extends Component {
  render() {
    return (
      <Query query={ALL_FEATURED_STUDIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <></>;
          if (error) return <p>Error: {error.message}</p>;
          const { featuredStudies } = data;

          if (featuredStudies.length) {
            return (
              <FeaturedStudies
                studies={featuredStudies}
                onSelectStudy={this.props.onSelectStudy}
              />
            );
          }
          return <></>;
        }}
      </Query>
    );
  }
}

export default Featured;
