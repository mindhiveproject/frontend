import React, { Component } from 'react';

import StudiesBank from '../../Bank/Studies/index';
import ComponentsBank from '../../Bank/Components/index';

import StyledMenu from '../../Styles/StyledMenu';

class Library extends Component {
  state = {
    tab: this.props.tab || 'studies',
  };

  handleItemClick = name => this.setState({ tab: name });

  render() {
    const { user, goToStudy, goToTask, redirect } = this.props;
    const { tab } = this.state;

    return (
      <>
        <StyledMenu>
          <div className="menu">
            <div
              onClick={() => this.handleItemClick('studies')}
              className={
                tab === 'studies' ? 'menuTitle selectedMenuTitle' : 'menuTitle'
              }
            >
              <p>Studies</p>
            </div>

            <div
              onClick={() => this.handleItemClick('components')}
              className={
                tab === 'components'
                  ? 'menuTitle selectedMenuTitle'
                  : 'menuTitle'
              }
            >
              <p>Tasks & Surveys</p>
            </div>
          </div>
        </StyledMenu>

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
