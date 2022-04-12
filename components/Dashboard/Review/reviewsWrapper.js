import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { StyledDasboard, StyledReviewDasboard } from '../styles';

import FeaturedProposals from './Proposals/featured';
import MyProposals from './Proposals/my';
import ClassProposals from './Proposals/ofClass';

class ReviewsWrapper extends Component {
  state = {
    tab: this.props.tab || 'public',
  };

  handleTabClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    const { classes } = this.props;

    return (
      <StyledDasboard>
        <StyledReviewDasboard>
          <h1>Review studies</h1>
          <div>
            <Menu text stackable className="discoverMenu">
              <Menu.Item
                name="public"
                active={tab === 'public'}
                onClick={this.handleTabClick}
                className={
                  tab === 'public'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>Featured studies</p>
              </Menu.Item>

              <Menu.Item
                name="my"
                active={tab === 'my'}
                onClick={this.handleTabClick}
                className={
                  tab === 'my'
                    ? 'discoverMenuTitle selectedMenuTitle'
                    : 'discoverMenuTitle'
                }
              >
                <p>My studies</p>
              </Menu.Item>

              {classes.map(({ id, title }) => (
                <Menu.Item
                  key={id}
                  name={id}
                  active={tab === id}
                  onClick={this.handleTabClick}
                  className={
                    tab === id
                      ? 'discoverMenuTitle selectedMenuTitle'
                      : 'discoverMenuTitle'
                  }
                >
                  <p>{title}</p>
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {tab === 'public' && (
            <FeaturedProposals
              openReview={this.props.openReview}
              openSynthesize={this.props.openSynthesize}
            />
          )}

          {tab === 'my' && (
            <MyProposals
              openReview={this.props.openReview}
              openSynthesize={this.props.openSynthesize}
            />
          )}

          {classes.map(c => c.id).includes(tab) && (
            <ClassProposals classId={tab} />
          )}
        </StyledReviewDasboard>
      </StyledDasboard>
    );
  }
}

export default ReviewsWrapper;
