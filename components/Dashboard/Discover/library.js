import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';

import StudiesBank from '../../Bank/Studies/index';
import ComponentsBank from '../../Bank/Components/index';

class Library extends Component {
  state = {
    tab: this.props.tab || 'studies',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { user, goToStudy, goToTask, redirect } = this.props;
    const { tab } = this.state;

    return (
      <>
        <div>
          <Menu text stackable className="discoverMenu">
            <Menu.Item
              name="studies"
              active={tab === 'studies'}
              onClick={this.handleItemClick}
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
              onClick={this.handleItemClick}
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
          <ComponentsBank
            componentType="COMPONENTS"
            user={user}
            redirect={redirect}
            onSelectTask={goToTask}
          />
        )}
      </>
    );
  }
}

export default Library;
