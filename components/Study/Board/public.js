import React, { Component } from 'react';
import Router from 'next/router';

import Featured from '../../Dashboard/Discover/featured';
import Library from '../../Dashboard/Discover/library';
import { StyledDasboard, StyledDiscoverDasboard } from '../../Dashboard/styles';

import StyledStudiesBoard from '../../Styles/StyledStudies';

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-@apollo/client/react/components-2-1-199e9e2bd01e
class AllStudies extends Component {
  goToStudy = study => {
    Router.push('/studies/[slug]', `/studies/${study.slug}`);
  };

  goToTask = component => {
    Router.push(
      `/${component?.taskType?.toLowerCase()}s/[slug]`,
      `/${component?.taskType?.toLowerCase()}s/${component.slug}`
    );
  };

  render() {
    return (
      <StyledStudiesBoard>
        <Featured onSelectStudy={this.goToStudy} />
        <div className="centered">
          <StyledDasboard>
            <StyledDiscoverDasboard>
              <Library
                goToStudy={this.goToStudy}
                goToTask={this.goToTask}
                redirect="m"
              />
            </StyledDiscoverDasboard>
          </StyledDasboard>
        </div>
      </StyledStudiesBoard>
    );
  }
}

export default AllStudies;
