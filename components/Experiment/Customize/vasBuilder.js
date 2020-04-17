import React, { Component } from 'react';
import { StyledStatementLine } from './styles';

class VasBuilder extends Component {
  packTheObject = value => ({
    target: {
      name: this.props.name,
      type: 'vas',
      value,
    },
  });

  handleChange = e => {
    const { id, value } = e.target;
    const updatedStatements = this.props.statements
      .split('\n')
      .map((item, j) => {
        if (j == id) {
          return value;
        }
        return item;
      });
    const updated = updatedStatements.join('\n');
    this.props.onChange(this.packTheObject(updated));
  };

  addStatement = e => {
    e.preventDefault();
    const updated = this.props.statements.concat('\n');
    this.props.onChange(this.packTheObject(updated));
  };

  deleteStatement = (e, id) => {
    e.preventDefault();
    const updatedStatements = this.props.statements
      .split('\n')
      .filter((item, j) => {
        if (j == id) {
          return false;
        }
        return true;
      });
    const updated = updatedStatements.join('\n');
    this.props.onChange(this.packTheObject(updated));
  };

  render() {
    const statements = this.props.statements.split('\n');
    return (
      <div>
        {statements.map((statement, number) => (
          <Statement
            statement={statement}
            number={number}
            key={number}
            handleStatementChange={this.handleChange}
            deleteStatement={this.deleteStatement}
          />
        ))}
        <button onClick={this.addStatement}>Add new statement</button>
      </div>
    );
  }
}

class Statement extends Component {
  render() {
    return (
      <StyledStatementLine>
        <div className="input">
          <input
            type="text"
            id={this.props.number}
            name={this.props.number}
            value={this.props.statement}
            onChange={this.props.handleStatementChange}
            required
          />
        </div>
        <div>
          <button
            onClick={e => this.props.deleteStatement(e, this.props.number)}
          >
            &times;
          </button>
        </div>
      </StyledStatementLine>
    );
  }
}

export default VasBuilder;
