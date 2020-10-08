import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class InfoTabs extends Component {
  state = {
    tab: this.props.tab || 'what',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  addTab = () => {
    const existingTabs =
      this.props.study?.info.filter(p => p.name.startsWith('tab')) || [];
    const counter = existingTabs.length;
    const name = `tab-${counter + Date.now()}`;
    this.props.handleParameterChange(
      {
        target: {
          name,
          type: 'text',
          value: 'New Tab',
          className: 'header',
        },
      },
      'header'
    );
  };

  deleteTab = name => {
    this.props.deleteParameter(name);
  };

  render() {
    const { tab } = this.state;
    const { infoBlocks } = this.props;
    const additionalTabs =
      this.props.study?.info.filter(p => p.name.startsWith('tab')) || [];
    const tabs = [
      {
        name: 'what',
        header: 'What',
      },
      {
        name: 'who',
        header: 'Who',
      },
      {
        name: 'why',
        header: 'Why',
      },
      ...additionalTabs,
    ];
    return (
      <>
        <div className="infoTabsContainer">
          <Menu text stackable className="discoverMenu">
            {tabs.map(atab => (
              <Menu.Item
                name={atab.name}
                active={tab === atab.name}
                onClick={this.handleItemClick}
                className={
                  tab === atab.name
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                {atab.name.startsWith('tab') ? (
                  <div className="tabHeaderContainer">
                    <input
                      type="text"
                      id={atab.name}
                      name={atab.name}
                      value={atab.header}
                      onChange={this.props.handleParameterChange}
                      className="header"
                    />
                    <span
                      onClick={() => {
                        this.deleteTab(atab.name);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ) : (
                  <p>{atab.header}</p>
                )}
              </Menu.Item>
            ))}
          </Menu>
          <button
            onClick={() => {
              this.addTab();
            }}
          >
            Add Tab
          </button>
        </div>

        {tabs.map(atab => (
          <>
            {this.state.tab === atab.name && (
              <div>
                <textarea
                  name={atab.name}
                  value={infoBlocks[atab.name]}
                  onChange={this.props.handleParameterChange}
                  className="text"
                  rows="10"
                />
              </div>
            )}
          </>
        ))}
      </>
    );
  }
}

export default InfoTabs;
