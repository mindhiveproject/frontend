import React, { Component } from 'react';

import Featured from './featured';
import Library from './library';

import { StyledDasboard, StyledDiscoverDasboard } from '../styles';

class Main extends Component {
  render() {
    const { tab, user, handleItemClick, goToStudy, goToTask } = this.props;

    return (
      <StyledDasboard>
        <StyledDiscoverDasboard>
          <Featured onSelectStudy={goToStudy} />
          <Library
            tab={tab}
            user={user}
            handleItemClick={handleItemClick}
            goToStudy={goToStudy}
            goToTask={goToTask}
            redirect="d"
          />
        </StyledDiscoverDasboard>
      </StyledDasboard>
    );
  }
}

export default Main;
