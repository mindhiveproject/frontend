import React, { Component } from 'react';
import Board from './board';
import CardModal from '../Card/modal';
import ProposalHeader from '../ProposalPage/proposalHeader';

class ProposalContainer extends Component {
  state = {
    page: 'board',
    cardId: null,
  };

  openCard = cardId => {
    this.setState({
      page: 'card',
      cardId,
    });
  };

  closeCard = () => {
    this.setState({
      page: 'board',
      cardId: null,
    });
  };

  render() {
    if (this.state.page === 'board') {
      return (
        <div>
          {this.props.proposalBuildMode && (
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.onClose}>
                ← Back
              </span>
            </div>
          )}

          {this.props.isPreview ? (
            <>
              <h2>
                Preview of proposal template{' '}
                <span className="templateName">
                  {this.props.proposal.title}
                </span>
              </h2>
              <p>{this.props.proposal.description}</p>
            </>
          ) : (
            <ProposalHeader
              proposal={this.props.proposal}
              proposalBuildMode={this.props.proposalBuildMode}
            />
          )}

          <Board
            id={this.props.proposal?.id}
            openCard={this.openCard}
            proposalBuildMode={this.props.proposalBuildMode}
            adminMode={this.props.adminMode}
            isPreview={this.props.isPreview}
            settings={this.props.proposal?.settings}
          />
        </div>
      );
    }

    if (this.state.page === 'card') {
      return (
        <CardModal
          cardId={this.state.cardId}
          boardId={this.props.proposal.id}
          open={this.state.page === 'card'}
          onClose={() => this.closeCard()}
          proposalBuildMode={this.props.proposalBuildMode}
          proposal={this.props.proposal}
          adminMode={this.props.adminMode}
          isPreview={this.props.isPreview}
        />
      );
    }
  }
}

export default ProposalContainer;
