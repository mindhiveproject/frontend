import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// import { StyledTemplateCard, StyledCardButtonsContainer } from './styles';
import { StyledCard } from '../Styles/Cards';

import DeleteTemplate from './delete';

import { ContainerOnlyForAuthorizedScientists } from '../Permissions/Scientist/index';

class TemplateCard extends Component {
  // prop types https://reactjs.org/docs/typechecking-with-proptypes.html
  static propTypes = {
    templateCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { template } = this.props;
    return (
      <StyledCard>
        <Link
          href={{
            pathname: '/templates/page',
            query: { id: template.id },
          }}
        >
          <a>
            <h1>{template.title}</h1>
          </a>
        </Link>
        <p>{template.shortDescription}</p>

        <Link
          href={{
            pathname: '/task/add',
            query: { id: template.id },
          }}
        >
          <a>
            <h2>
              <button>Create a new task based on this template</button>
            </h2>
          </a>
        </Link>

        <ContainerOnlyForAuthorizedScientists id={template.author.id}>
          <Link
            href={{
              pathname: '/templates/edit',
              query: { id: template.id },
            }}
          >
            <a>
              <h2>
                <button>Edit</button>
              </h2>
            </a>
          </Link>
          <DeleteTemplate id={template.id}>Delete</DeleteTemplate>
        </ContainerOnlyForAuthorizedScientists>
      </StyledCard>
    );
  }
}

export default TemplateCard;
