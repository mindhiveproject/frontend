import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from '../../ErrorMessage/index';
import { StyledParameterForm } from '../../Styles/Forms';
import { StyledParameterBlock } from './styles';
import { MY_PARAMETERS_QUERY } from '../../Experiments/Custom/my';
import { ALL_PARAMETERS_QUERY } from '../../Experiments/Custom/index';
import { parameters_rating } from '../../Labjs/protocols/rating';
import { parameters_risktaking } from '../../Labjs/protocols/risktaking';

const EXPERIMENT_DEFAULT_PARAMETER_QUERY = gql`
  query EXPERIMENT_DEFAULT_PARAMETER_QUERY($id: ID!) {
    experiment(where: { id: $id }) {
      id
      title
      description
      parameters
    }
  }
`;

const CREATE_PARAMETER = gql`
  mutation CREATE_PARAMETER($title: String!, $experimentId: ID!, $data: Json) {
    createParameter(title: $title, experimentId: $experimentId, data: $data) {
      id
      title
    }
  }
`;

class CreateParameter extends Component {
  render() {
    return (
      <Query
        query={EXPERIMENT_DEFAULT_PARAMETER_QUERY}
        variables={{ id: this.props.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.experiment)
            return <p>No experiment found for id {this.props.id}</p>;
          console.log('experiment', data);
          return (
            <ParameterForm
              parameters={data.experiment.parameters}
              title={data.experiment.title}
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

  createParameter = async (e, createParameterMutation) => {
    e.preventDefault();
    const res = await createParameterMutation({
      variables: {
        experimentId: this.props.id,
        ...this.state,
      },
    });
    // change the page
    Router.push({
      pathname: '/bank/mycustom',
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_PARAMETER}
        variables={this.state}
        refetchQueries={[
          { query: MY_PARAMETERS_QUERY },
          { query: ALL_PARAMETERS_QUERY },
        ]}
      >
        {(createParameter, { loading, error }) => {
          console.log('ready', this.state);
          const { parameters } = this.props;
          return (
            <StyledParameterForm
              onSubmit={e => this.createParameter(e, createParameter)}
            >
              <h2>Create your own parameters</h2>
              <Error error={error} />
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

                {parameters.map(({ name, value, type, help }) => (
                  <StyledParameterBlock key={name} htmlFor={name}>
                    <div className="help">{help}</div>
                    <div className="name">{name}</div>
                    <div className="input">
                      <input
                        type={type}
                        id={name}
                        name={name}
                        value={this.state.data
                          .filter(param => param.name === name)
                          .map(param => param.value)}
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

export default CreateParameter;
