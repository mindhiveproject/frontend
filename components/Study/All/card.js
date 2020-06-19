import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { StyledStudyCard, StyledCardButtonsContainer } from '../styles';

import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';

class StudyCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    studyCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { study } = this.props;
    return (
      <StyledStudyCard>
        <Link
          href={{
            pathname: `/study/${study.slug}`,
          }}
        >
          <a>
            <h2>{study.title}</h2>
          </a>
        </Link>
        <p>{study.shortDescription}</p>

        <ContainerOnlyForScientists>
          <Link
            href={{
              pathname: '/studies/edit',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>Edit</h2>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/studies/build',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>Build</h2>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/studies/page',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>Info</h2>
            </a>
          </Link>
        </ContainerOnlyForScientists>

        <Link href="/study/[slug]" as={`/study/${study.slug}`}>
          <a>
            <h2>Enter</h2>
          </a>
        </Link>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
