import { Menu } from 'semantic-ui-react';
import React, { Component } from 'react';

import Featured from './featured';
import StudiesBank from '../../Bank/Studies/index';
import ComponentsBank from '../../Bank/Components/index';

import { StyledDasboard, StyledDiscoverDasboard } from '../styles';

class Main extends Component {
  render() {
    const { tab, user, handleItemClick, goToStudy } = this.props;

    return (
      <StyledDasboard>
        <StyledDiscoverDasboard>
          {false && (
            <p>
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1PjobN7C3LUDuiFUanZd7BuTGYRf5zq9t_CUGGKQjLyM/edit?usp=sharing"
              >
                Tasks and Surveys descriptions
              </a>
            </p>
          )}

          <Featured onSelectStudy={goToStudy} />

          <div>
            <Menu text stackable className="discoverMenu">
              <Menu.Item
                name="studies"
                active={tab === 'studies'}
                onClick={handleItemClick}
                className={
                  tab === 'studies'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Studies</p>
              </Menu.Item>

              <Menu.Item
                name="components"
                active={tab === 'components'}
                onClick={handleItemClick}
                className={
                  tab === 'components'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Tasks & Surveys</p>
              </Menu.Item>
            </Menu>
          </div>

          {tab === 'studies' && <StudiesBank onSelectStudy={goToStudy} />}

          {tab === 'components' && (
            <ComponentsBank componentType="COMPONENTS" user={user} />
          )}
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
