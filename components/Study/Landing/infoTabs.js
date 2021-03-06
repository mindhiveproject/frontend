import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

class InfoTabs extends Component {
  state = {
    tab: 'what',
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { study, infoBlocks } = this.props;
    const { tab } = this.state;

    const additionalTabs =
      study?.info.filter(p => p.name.startsWith('tab')) || [];

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
          <Menu tabular stackable>
            {tabs.map((atab, num) => (
              <Menu.Item
                key={num}
                name={atab.name}
                active={tab === atab.name}
                onClick={this.handleItemClick}
              >
                {atab.header}
              </Menu.Item>
            ))}
          </Menu>
        </div>

        {tabs.map((atab, num) => (
          <div key={num}>
            {this.state.tab === atab.name && (
              <div>{infoBlocks && ReactHtmlParser(infoBlocks[atab.name])}</div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default InfoTabs;
