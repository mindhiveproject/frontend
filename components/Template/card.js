import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { StyledTemplateCard, StyledCardButtonsContainer } from './styles';

import DeleteTemplate from './delete';

import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';

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
      <StyledTemplateCard>
        <Link
          href={{
            pathname: '/templates/page',
            query: { id: template.id },
          }}
        >
          <a>
            <h2>{template.title}</h2>
          </a>
        </Link>
        <p>{template.shortDescription}</p>

        <ContainerOnlyForScientists>
          <Link
            href={{
              pathname: '/templates/edit',
              query: { id: template.id },
            }}
          >
            <a>
              <h2>Edit</h2>
            </a>
          </Link>
          <DeleteTemplate id={template.id}>Delete</DeleteTemplate>
        </ContainerOnlyForScientists>

        <Link
          href={{
            pathname: '/tasks/add',
            query: { id: template.id },
          }}
        >
          <a>
            <h2>Create a new task</h2>
          </a>
        </Link>
      </StyledTemplateCard>
    );
  }
}

export default TemplateCard;
