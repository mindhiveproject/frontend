import React, { Component } from 'react';
import { StyledSurveyBuilderItemLine } from '../../styles';

class ArrayBuilder extends Component {
  state = {
    items: JSON.parse(this.props.content) || [],
  };

  updateProps = items => {
    const packed = this.packTheObject(items);
    this.props.onChange(packed);
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { items } = this.state;
    const updatedItems = items.map((item, number) =>
      number === parseInt(name) ? value : item
    );
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  packTheObject = value => ({
    target: {
      name: this.props.name,
      type: 'array',
      value: JSON.stringify(value),
    },
  });

  addItem = e => {
    e.preventDefault();
    const { items } = this.state;
    const updatedItems = [...items, ''];
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  deleteItem = (e, number) => {
    e.preventDefault();
    const updatedItems = this.state.items.filter(
      (item, num) => num !== parseInt(number)
    );
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  render() {
    const { items } = this.state;
    if (items) {
      return (
        <div>
          {items &&
            items.length > 0 &&
            items.map((item, number) => (
              <Item
                item={item}
                key={number}
                id={number}
                handleItemChange={this.handleChange}
                deleteItem={this.deleteItem}
              />
            ))}
          <button className="addButton" onClick={this.addItem}>
            +
          </button>
        </div>
      );
    }
    return (
      <button className="addButton" onClick={this.addItem}>
        +
      </button>
    );
  }
}

class Item extends Component {
  render() {
    const { id, item } = this.props;
    return (
      <StyledSurveyBuilderItemLine>
        <div className="input">
          <>
            <div>Condition</div>
            <input
              type="text"
              name={id}
              value={item}
              onChange={this.props.handleItemChange}
              className="element"
            />
          </>
        </div>
        <div className="controlButtons">
          <div className="deleteDiv">
            <button onClick={e => this.props.deleteItem(e, id)}>&times;</button>
          </div>
        </div>
      </StyledSurveyBuilderItemLine>
    );
  }
}

export default ArrayBuilder;
