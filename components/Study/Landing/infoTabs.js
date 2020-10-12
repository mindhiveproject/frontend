import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

class InfoTabs extends Component {
  state = {
    tab: this.props.tab || 'what',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

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
      <div className="studyWhatWhoHow">
        <div className="descriptionMenu">
          <Menu tabular>
            {tabs.map(atab => (
              <Menu.Item
                name={atab.name}
                active={tab === atab.name}
                onClick={this.handleItemClick}
              >
                {atab.header}
              </Menu.Item>
            ))}
          </Menu>
        </div>

        {tabs.map(atab => (
          <>
            {this.state.tab === atab.name && (
              <div>{ReactHtmlParser(infoBlocks[atab.name])}</div>
            )}
          </>
        ))}
      </div>
    );
  }
}

export default InfoTabs;
