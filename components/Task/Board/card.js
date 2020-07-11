import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// import { StyledTaskCard, StyledCardButtonsContainer } from '../styles';
import { StyledCard } from '../../Styles/Cards';

import DeleteTask from './delete';

import { ContainerOnlyForAuthorizedScientists } from '../../Permissions/Scientist/index';

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
      <StyledCard>
        <Link
          href={{
            pathname: '/tasks/page',
            query: { id: task.id },
          }}
        >
          <a>
            <h1>{task.title}</h1>
          </a>
        </Link>
        <p>{task.shortDescription}</p>

        <Link
          href={{
            pathname: '/tasks/page',
            query: { id: task.id },
          }}
        >
          <a>
            <h2>
              <button>Open</button>
            </h2>
          </a>
        </Link>

        <ContainerOnlyForAuthorizedScientists id={task.author.id}>
          <Link
            href={{
              pathname: '/tasks/edit',
              query: { id: task.id },
            }}
          >
            <a>
              <h2>
                <button>Edit</button>
              </h2>
            </a>
          </Link>

          <DeleteTask id={task.id}>Delete</DeleteTask>
        </ContainerOnlyForAuthorizedScientists>

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
      </StyledCard>
    );
  }
}

export default TaskCard;