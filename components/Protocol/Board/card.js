import React, { Component } from 'react';
import Link from 'next/link';

import { StyledCard } from '../../Styles/Cards';

import DeleteProtocol from './delete';

import { ContainerOnlyForAuthorizedScientists } from '../../Permissions/Scientist/index';
import { ContainerOnlyForAuthorizedCollaborators } from '../../Permissions/Collaborator/index';

class ProtocolCard extends Component {
  render() {
    const { protocol } = this.props;
    return (
      <StyledCard>
        <h2>{protocol.title}</h2>

        <ContainerOnlyForAuthorizedScientists
          id={protocol.author && protocol.author.id}
        >
          <Link
            href={{
              pathname: '/irb/edit',
              query: { id: protocol.id },
            }}
          >
            <a>
              <h2>
                <button>Edit</button>
              </h2>
            </a>
          </Link>
          <DeleteProtocol id={protocol.id}>Delete</DeleteProtocol>
        </ContainerOnlyForAuthorizedScientists>

        <ContainerOnlyForAuthorizedCollaborators
          ids={protocol.collaborators && protocol.collaborators.map(c => c.id)}
        >
          <Link
            href={{
              pathname: '/irb/edit',
              query: { id: protocol.id },
            }}
          >
            <a>
              <h2>
                <button>Edit</button>
              </h2>
            </a>
          </Link>
        </ContainerOnlyForAuthorizedCollaborators>
      </StyledCard>
    );
  }
}

export default ProtocolCard;
