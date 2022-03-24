import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import moment from 'moment';

import styled from 'styled-components';
import { StyledDasboard, StyledClassesDasboard } from '../styles';

const StyledClassHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const All_CLASS_NETWORKS_QUERY = gql`
  query All_CLASS_NETWORKS_QUERY {
    classNetworks {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      classes {
        id
        title
      }
    }
  }
`;

class ClassNetworksList extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <Query query={All_CLASS_NETWORKS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { classNetworks } = data;
              if (classNetworks.length === 0) {
                return (
                  <>
                    <h3>There are no class networks yet.</h3>
                    <div>
                      <button onClick={this.props.addClassNetwork}>
                        Add class network
                      </button>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div>
                      <button onClick={this.props.addClassNetwork}>
                        Add class network
                      </button>
                    </div>
                  </div>
                  <div>
                    <StyledClassHeader>
                      <div>Network name</div>
                      <div>Creator</div>
                      <div>Number of classes</div>
                      <div>Date created</div>
                    </StyledClassHeader>

                    {classNetworks.map(classNetwork => (
                      <ClassRow
                        classNetwork={classNetwork}
                        key={classNetwork.id}
                        updateClassNetwork={this.props.updateClassNetwork}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

const StyledClassWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: 1rem;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
`;

class ClassRow extends Component {
  render() {
    const { classNetwork } = this.props;
    return (
      <StyledClassWrapper>
        <StyledClassRow>
          <div>{classNetwork?.title}</div>
          <div>{classNetwork?.creator?.username}</div>
          <div>{classNetwork?.classes?.length}</div>
          <div>{moment(classNetwork?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
        <div>
          <a onClick={() => this.props.updateClassNetwork(classNetwork?.id)}>
            Edit
          </a>
        </div>
      </StyledClassWrapper>
    );
  }
}

export default ClassNetworksList;
export { All_CLASS_NETWORKS_QUERY };
