import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { Mutation } from '@apollo/client/react/components';
import { StyledUpdateCard } from './styles';

// import mutation for openning and deleting an update
import { OPEN_UPDATE, DELETE_UPDATE } from '../../Mutations/Update';
import { MY_UPDATES_QUERY } from '../../Queries/Update';

class UpdateCard extends Component {
  render() {
    const { update } = this.props;
    return (
      <StyledUpdateCard>
        <div className="infoMessage">
          <h2>{update?.content?.message}</h2>
          <div className="contextInfo">
            {moment(update.createdAt).fromNow()}
          </div>
        </div>
        <div className="linkMessage">
          <Mutation
            mutation={OPEN_UPDATE}
            variables={{
              id: update?.id,
              hasOpen: true,
            }}
            refetchQueries={[{ query: MY_UPDATES_QUERY }]}
          >
            {openUpdate => (
              <div onClick={() => openUpdate()}>
                <Link href={`${update.link}`} as={`${update.link}`}>
                  <a>
                    <p>Open</p>
                  </a>
                </Link>
              </div>
            )}
          </Mutation>
        </div>
        <div className="deleteButton">
          <Mutation
            mutation={DELETE_UPDATE}
            variables={{
              id: update?.id,
            }}
            refetchQueries={[{ query: MY_UPDATES_QUERY }]}
          >
            {deleteUpdate => <div onClick={() => deleteUpdate()}>&times;</div>}
          </Mutation>
        </div>
      </StyledUpdateCard>
    );
  }
}

export default UpdateCard;
