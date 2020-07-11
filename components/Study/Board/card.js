import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// import { StyledStudyCard, StyledCardButtonsContainer } from '../styles';
import { StyledCard } from '../../Styles/Cards';

import DeleteStudy from './delete';

import { ContainerOnlyForAuthorizedScientists } from '../../Permissions/Scientist/index';

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
      <StyledCard>
        <Link href="/study/[slug]" as={`/study/${study.slug}`}>
          <a>
            <h2>{study.title}</h2>
          </a>
        </Link>
        <p>{study.shortDescription}</p>

        <ContainerOnlyForAuthorizedScientists
          id={study.author && study.author.id}
        >
          <Link
            href={{
              pathname: '/studies/edit',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>
                <button>Edit</button>
              </h2>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/studies/build',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>
                <button>Build</button>
              </h2>
            </a>
          </Link>
          {false && (
            <Link
              href={{
                pathname: '/studies/page',
                query: { id: study.id },
              }}
            >
              <a>
                <h2>
                  <button>Info</button>
                </h2>
              </a>
            </Link>
          )}
          <DeleteStudy id={study.id}>Delete</DeleteStudy>
        </ContainerOnlyForAuthorizedScientists>

        <Link href="/study/[slug]" as={`/study/${study.slug}`}>
          <a>
            <h2>
              <button>Enter</button>
            </h2>
          </a>
        </Link>
      </StyledCard>
    );
  }
}

export default StudyCard;