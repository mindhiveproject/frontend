import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { StyledExperimentCard, StyledCardButtonsContainer } from './styles';

import DeleteExperiment from '../Experiment/Delete/index';

import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';

import HiddenTokenSignup from '../Sign/Token/hidden';

class ExperimentCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    experimentCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { experiment } = this.props;
    return (
      <StyledExperimentCard>
        <h2>{experiment.title}</h2>
        <p>{experiment.description}</p>

        <ContainerOnlyForScientists>
          <Link
            href={{
              pathname: '/bank/edit',
              query: { id: experiment.id },
            }}
          >
            <a>
              <h2>Change</h2>
            </a>
          </Link>
          <DeleteExperiment id={experiment.id}>Delete</DeleteExperiment>
        </ContainerOnlyForScientists>

        <StyledCardButtonsContainer>
          <ContainerOnlyForProfile>
            <Link
              href={{
                pathname: '/exp',
                query: { id: experiment.id },
              }}
            >
              <a>
                <h2>Open</h2>
              </a>
            </Link>
            {false && <HiddenTokenSignup redirect={experiment.id} />}
          </ContainerOnlyForProfile>
        </StyledCardButtonsContainer>
      </StyledExperimentCard>
    );
  }
}

export default ExperimentCard;
