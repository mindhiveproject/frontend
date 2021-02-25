import React, { Component } from 'react';

import styled from 'styled-components';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const StyledClassHeader = styled.div`
  display: grid;
  margin-bottom: 70px;
  padding: 10px;
  input,
  textarea,
  select {
    background: #f6f9f8;
    width: 100%;
    border: 0px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: #007c70;
    color: white;
    max-width: 256px;
    border-radius: 3px;
    cursor: pointer;
  }
  .title {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 23px;
  }
  .description {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

const UPDATE_CLASS = gql`
  mutation UPDATE_CLASS($id: ID!, $title: String, $description: String) {
    updateClass(id: $id, title: $title, description: $description) {
      id
      code
      title
      description
    }
  }
`;

class ClassHeader extends Component {
  state = {
    id: this.props.schoolclass.id,
    title: this.props.schoolclass.title,
    description: this.props.schoolclass.description,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_CLASS} variables={this.state}>
        {(updateClass, { loading, error }) => {
          if (error) {
            alert(
              'Oops! this class title has already be taken: please pick another.'
            );
          }
          return (
            <StyledClassHeader>
              <div>
                <div>
                  <label htmlFor="title">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                      className="title"
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="description">
                    <textarea
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      rows="7"
                      className="description"
                    />
                  </label>
                </div>

                {(this.state.title !== this.props.schoolclass.title ||
                  this.state.description !==
                    this.props.schoolclass.description) && (
                  <div>
                    <button
                      className="secondaryBtn"
                      onClick={async () => {
                        const res = await updateClass();
                      }}
                    >
                      {loading ? 'Saving' : 'Save'}
                    </button>
                  </div>
                )}
              </div>
            </StyledClassHeader>
          );
        }}
      </Mutation>
    );
  }
}

export default ClassHeader;
