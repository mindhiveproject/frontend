import React, { Component } from 'react';
import { StyledParameterForm, StyledParameterBlock } from './styles';

class ParameterForm extends Component {
  render() {
    return (
      <StyledParameterForm onSubmit={this.props.onHandleSubmit}>
        <h2>Edit your parameters</h2>

        <fieldset disabled={this.props.loading} aria-busy={this.props.loading}>
          <StyledParameterBlock htmlFor="title">
            <div className="help">Give a title to your new experiment</div>
            <div className="input">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={this.props.title}
                onChange={this.props.onHandleChange}
                required
              />
            </div>
          </StyledParameterBlock>

          {this.props.data.map(({ name, value, type, help, example }) => (
            <StyledParameterBlock key={name} htmlFor={name}>
              <div className="help">{help}</div>
              <div className="example">{example}</div>
              <div className="input">
                {type === 'textarea' ? (
                  <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={this.props.onHandleParamChange}
                    required
                  />
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={this.props.onHandleParamChange}
                    required
                  />
                )}
              </div>
            </StyledParameterBlock>
          ))}

          <button type="submit">
            Sav{this.props.loading ? 'ing' : 'e'} changes
          </button>
        </fieldset>
      </StyledParameterForm>
    );
  }
}

export default ParameterForm;
