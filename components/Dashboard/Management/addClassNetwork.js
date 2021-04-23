import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { All_CLASS_NETWORKS_QUERY } from './classNetworks';
import { StyledSubmitForm } from '../../Styles/Forms';

import FindClass from './findClass';

const CREATE_NEW_CLASS_NETWORK = gql`
  mutation CREATE_NEW_CLASS_NETWORK(
    $title: String!
    $description: String
    $classes: [ID]
  ) {
    createClassNetwork(
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

class AddClass extends Component {
  state = {
    title: '',
    description: '',
    classes: [],
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
          mutation={CREATE_NEW_CLASS_NETWORK}
          variables={this.state}
          refetchQueries={[{ query: All_CLASS_NETWORKS_QUERY }]}
        >
          {(createClass, { loading, error }) => (
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
                  const res = await createClass();
                  this.props.goBack();
                }}
              >
                <h1>Create a new class network</h1>
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

                  <button type="submit">Create</button>
                </fieldset>
              </StyledSubmitForm>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddClass;
