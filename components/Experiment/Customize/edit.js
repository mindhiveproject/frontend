import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../../ErrorMessage/index';
import { StyledParameterForm } from '../../Styles/Forms';
import { StyledParameterBlock } from './styles';
import { CUSTOM_PARAMETER_QUERY } from '../CustomRun/index';

const UPDATE_PARAMETER = gql`
  mutation UPDATE_PARAMETER($id: ID!, $title: String, $data: Json) {
    updateParameter(id: $id, title: $title, data: $data) {
      id
      title
    }
  }
`;

class EditParameter extends Component {
  render() {
    return (
      <Query query={CUSTOM_PARAMETER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.parameter)
            return <p>No parameters found for id {this.props.id}</p>;
          return (
            <ParameterForm
              parameters={data.parameter.data}
              title={data.parameter.title}
              id={this.props.id}
            />
          );
        }}
      </Query>
    );
  }
}

class ParameterForm extends Component {
  state = {
    title: this.props.title,
    data: this.props.parameters,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  handleParamChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      data: this.state.data.map(el =>
        el.name === name ? { ...el, value: val } : el
      ),
    });
  };

  updateParameter = async (e, updateParameterMutation) => {
    e.preventDefault();
    console.log('updating parameters', this.state, this.props.id);
    const res = await updateParameterMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_PARAMETER} variables={this.state}>
        {(updateParameter, { loading, error }) => {
          const { parameters, title } = this.props;
          // console.log('ready parameters', title, parameters);
          return (
            <StyledParameterForm
              onSubmit={e => this.updateParameter(e, updateParameter)}
            >
              <h2>Edit your parameters</h2>

              <fieldset disabled={loading} aria-busy={loading}>
                <StyledParameterBlock htmlFor="title">
                  <div className="help">
                    Give a title to your new experiment
                  </div>
                  <div className="name">title</div>
                  <div className="input">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </StyledParameterBlock>

                {this.state.data.map(({ name, value, type, help }) => (
                  <StyledParameterBlock key={name} htmlFor={name}>
                    <div className="help">{help}</div>
                    <div className="name">{name}</div>
                    <div className="input">
                      <input
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={this.handleParamChange}
                        required
                      />
                    </div>
                  </StyledParameterBlock>
                ))}

                <button type="submit">
                  Sav{loading ? 'ing' : 'e'} changes
                </button>
              </fieldset>
            </StyledParameterForm>
          );
        }}
      </Mutation>
    );
  }
}

export default EditParameter;
