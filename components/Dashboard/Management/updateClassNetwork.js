import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { All_CLASS_NETWORKS_QUERY } from './classNetworks';
import { StyledSubmitForm } from '../../Styles/Forms';

import FindClass from './findClass';

const CLASS_NETWORK_QUERY = gql`
  query CLASS_NETWORK_QUERY($id: ID!) {
    classNetwork(where: { id: $id }) {
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

const UPDATE_CLASS_NETWORK = gql`
  mutation UPDATE_CLASS_NETWORK(
    $id: ID!
    $title: String!
    $description: String
    $classes: [ID]
  ) {
    updateClassNetwork(
      id: $id
      title: $title
      description: $description
      classes: $classes
    ) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  height: 100vh;
  background: #f7f9f8;
  grid-template-rows: 0px auto;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    width: 3.3rem;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    padding-bottom: 5px;
    font-size: 2rem;
    :hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

class EditClassNetworkWrapper extends Component {
  render() {
    return (
      <Query
        query={CLASS_NETWORK_QUERY}
        variables={{ id: this.props.classNetworkId }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { classNetwork } = data;
          if (!classNetwork) return <p>Error: no class network</p>;

          return (
            <EditNetwork
              classNetwork={classNetwork}
              goBack={this.props.goBack}
            />
          );
        }}
      </Query>
    );
  }
}

class EditNetwork extends Component {
  state = {
    id: this.props.classNetwork?.id,
    title: this.props.classNetwork?.title,
    description: this.props.classNetwork?.description,
    classes: this.props.classNetwork?.classes.map(cl => cl.id),
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleClassesChange = classes => {
    this.setState({
      classes: [...classes],
    });
  };

  render() {
    return (
      <StyledSelectionScreen>
        <Mutation
          mutation={UPDATE_CLASS_NETWORK}
          variables={{ ...this.state }}
          refetchQueries={[
            { query: All_CLASS_NETWORKS_QUERY },
            {
              query: CLASS_NETWORK_QUERY,
              variables: { id: this.props.classNetwork?.id },
            },
          ]}
        >
          {(updateNetwork, { loading, error }) => (
            <>
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>

              <StyledSubmitForm
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await updateNetwork();
                  this.props.goBack();
                }}
              >
                <h1>Edit the class network</h1>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    <p>Title</p>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                  <label htmlFor="description">
                    <p>Description</p>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      required
                    />
                  </label>

                  <label htmlFor="classes">
                    <p>Classes</p>
                  </label>
                  <FindClass
                    classes={this.state.classes}
                    handleClassesChange={this.handleClassesChange}
                  />

                  <button type="submit">Save</button>
                </fieldset>
              </StyledSubmitForm>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default EditClassNetworkWrapper;
