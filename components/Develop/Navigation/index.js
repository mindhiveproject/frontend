import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';
import { StyledNavigation } from './styles';
import SaveStudy from './saveStudy';

import { TOGGLE_OPENING_MUTATION } from '../../Opening/index';

import Collaborators from './collaborators';
import ArchiveDelete from '../../Bank/Studies/archiveDelete';

export default class Navigation extends Component {
  render() {
    const { study, page, user } = this.props;
    const isHidden =
      user?.studiesInfo &&
      user?.studiesInfo[this.props.study?.id]?.hideInDevelop;

    return (
      <StyledNavigation>
        <div className="firstLine">
          <div>
            <span className="studyTitle">{study?.title}</span>
          </div>
          <div className="rightPanel">
            <Collaborators
              openSharingModal={this.props.openSharingModal}
              study={study}
            />

            <div>
              <Mutation mutation={TOGGLE_OPENING_MUTATION}>
                {toggleOpening => (
                  <button onClick={toggleOpening}>
                    <Icon name="rocketchat" size="large" />
                  </button>
                )}
              </Mutation>
            </div>

            <ArchiveDelete study={this.props.study} isHidden={isHidden} />

            <SaveStudy
              study={this.props.study}
              isAuthor={this.props.isAuthor}
              adminMode={this.props.adminMode}
              needToClone={this.props.needToClone}
              newStudyFromScratch={this.props.newStudyFromScratch}
              proposalId={this.props.proposalId}
              createNewStudy={this.props.createNewStudy}
              updateMyStudy={this.props.updateMyStudy}
            />
          </div>
        </div>
        <div className="secondLine">
          <Menu text stackable className="discoverMenu">
            <Menu.Item
              name="proposal"
              active={page === 'proposal'}
              onClick={this.props.handlePageChange}
              className={
                page === 'proposal'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Proposal</p>
            </Menu.Item>

            <Menu.Item
              name="builder"
              active={page === 'builder'}
              onClick={this.props.handlePageChange}
              className={
                page === 'builder'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Study Builder</p>
            </Menu.Item>

            <Menu.Item
              name="review"
              active={page === 'review'}
              onClick={this.props.handlePageChange}
              className={
                page === 'review'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Reviews</p>
            </Menu.Item>

            <Menu.Item
              name="collect"
              active={page === 'collect'}
              onClick={this.props.handlePageChange}
              className={
                page === 'collect'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Collect</p>
            </Menu.Item>

            <Menu.Item
              name="download"
              active={page === 'download'}
              onClick={this.props.handlePageChange}
              className={
                page === 'download'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Download</p>
            </Menu.Item>

            <Menu.Item
              name="analyze"
              active={page === 'analyze'}
              onClick={this.props.handlePageChange}
              className={
                page === 'analyze'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <p>Analyze</p>
            </Menu.Item>
          </Menu>
        </div>
      </StyledNavigation>
    );
  }
}
