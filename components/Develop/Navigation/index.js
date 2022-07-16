import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Mutation } from '@apollo/client/react/components';
import { StyledNavigation } from './styles';
import SaveStudy from './saveStudy';

import { TOGGLE_OPENING_MUTATION } from '../../Opening/index';

import Collaborators from './collaborators';
import ArchiveDelete from '../../Bank/Studies/archiveDelete';
import SharingModal from '../Sharing/modal';

export default class Navigation extends Component {
  state = {
    modal: null,
  };

  openModal = modal => {
    this.setState({
      modal,
    });
  };

  onModalClose = () => {
    this.setState({
      modal: null,
    });
  };

  render() {
    const { study, page, user } = this.props;
    const isHidden =
      user?.studiesInfo &&
      user?.studiesInfo[this.props.study?.id]?.hideInDevelop;

    return (
      <StyledNavigation>
        <div className="firstLine">
          <div className="leftPanel">
            <div className="goBackBtn" onClick={this.props.onLeave}>
              ←
            </div>
            <div>
              <span className="studyTitle">{study?.title}</span>
            </div>
          </div>

          <div className="rightPanel">
            <Collaborators
              openSharingModal={() => this.openModal('sharing')}
              study={study}
            />

            <Mutation mutation={TOGGLE_OPENING_MUTATION}>
              {toggleOpening => (
                <div className="chatButton" onClick={toggleOpening}>
                  <img src="/content/icons/chat.svg" />
                </div>
              )}
            </Mutation>

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
              <img src="/content/icons/Loading.svg" />
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
              <img src="/content/icons/Edit.svg" />
              <p>Study Builder</p>
            </Menu.Item>

            <Menu.Item
              name="participant"
              active={page === 'participant'}
              onClick={this.props.handlePageChange}
              className={
                page === 'participant'
                  ? 'discoverMenuTitle selectedMenuTitle'
                  : 'discoverMenuTitle'
              }
            >
              <img src="/content/icons/Finder.svg" />
              <p>Participant Page</p>
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
              <img src="/content/icons/Eye.svg" />
              <p>Review</p>
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
              <img src="/content/icons/Briefcase.svg" />
              <p>Test & Collect</p>
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
              <img src="/content/icons/Stats.svg" />
              <p>Analyze</p>
            </Menu.Item>
          </Menu>
        </div>
        {this.state.modal === 'sharing' && (
          <SharingModal {...this.props} onModalClose={this.onModalClose} />
        )}
      </StyledNavigation>
    );
  }
}
