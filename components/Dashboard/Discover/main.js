import React, { Component } from 'react';

import Featured from './featured';
import Library from './library';

import { StyledDasboard, StyledDiscoverDasboard } from '../styles';

class Main extends Component {
  render() {
    const { tab, user, handleItemClick, goToStudy } = this.props;

    return (
      <StyledDasboard>
        <StyledDiscoverDasboard>
          <Featured onSelectStudy={goToStudy} />
          <Library
            tab={tab}
            user={user}
            handleItemClick={handleItemClick}
            goToStudy={goToStudy}
            redirect="d"
          />
        </StyledDiscoverDasboard>
      </StyledDasboard>
    );
  }
}

export default Main;

// <Menu.Item
//   name="tasks"
//   active={tab === 'tasks'}
//   onClick={handleItemClick}
//   className={
//     tab === 'tasks'
//       ? 'discoverMenuTitle selectedMenuTitle'
//       : 'discoverMenuTitle'
//   }
// >
//   <p>Tasks</p>
// </Menu.Item>
//
// <Menu.Item
//   name="surveys"
//   active={tab === 'surveys'}
//   onClick={handleItemClick}
//   className={
//     tab === 'surveys'
//       ? 'discoverMenuTitle selectedMenuTitle'
//       : 'discoverMenuTitle'
//   }
// >
//   <p>Surveys</p>
// </Menu.Item>
//
// {tab === 'tasks' && (
//   <ComponentsBank componentType="TASK" user={user} />
// )}
//
// {tab === 'surveys' && (
//   <ComponentsBank componentType="SURVEY" user={user} />
// )}
