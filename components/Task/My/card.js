import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { StyledTaskCard, StyledCardButtonsContainer } from '../styles';

import DeleteTask from './delete';

import { ContainerOnlyForScientists } from '../../Permissions/Scientist/index';

class TaskCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    taskCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { task } = this.props;
    return (
      <StyledTaskCard>
        <Link
          href={{
            pathname: '/tasks/page',
            query: { id: task.id },
          }}
        >
          <a>
            <h2>{task.title}</h2>
          </a>
        </Link>
        <p>{task.shortDescription}</p>

        <ContainerOnlyForScientists>
          <Link
            href={{
              pathname: '/tasks/edit',
              query: { id: task.id },
            }}
          >
            <a>
              <h2>Edit</h2>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/tasks/page',
              query: { id: task.id },
            }}
          >
            <a>
              <h2>Info</h2>
            </a>
          </Link>
          <DeleteTask id={task.id}>Delete</DeleteTask>
        </ContainerOnlyForScientists>

        {false && (
          <Link
            href={{
              pathname: `/task/${task.slug}`,
            }}
          >
            <a>
              <h2>Task page for participants</h2>
            </a>
          </Link>
        )}
      </StyledTaskCard>
    );
  }
}

export default TaskCard;
