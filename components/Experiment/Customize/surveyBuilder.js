import React, { Component } from 'react';
import { StyledSurveyBuilderItemLine } from './styles';

class SurveyBuilder extends Component {
  state = {
    items: JSON.parse(this.props.content) || [],
  };

  updateProps = items => {
    const packed = this.packTheObject(items);
    this.props.onChange(packed);
  };

  handleChange = e => {
    const { id, value, className, name } = e.target;
    const { items } = this.state;
    const updatedItems = items.map(item =>
      item.id === parseInt(name) ? { ...item, [className]: value } : item
    );
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  packTheObject = value => ({
    target: {
      name: this.props.name,
      type: 'survey',
      value: JSON.stringify(value),
    },
  });

  addItem = e => {
    e.preventDefault();
    const { items } = this.state;
    const updatedItems = [
      ...items,
      {
        id: items.length,
        type: 'select',
        question: '',
        min_rating_label: '',
        max_rating_label: '',
        options: '',
      },
    ];
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  deleteItem = (e, number) => {
    e.preventDefault();
    const updatedItems = this.state.items.filter((item, num) => num !== number);
    this.setState({
      items: updatedItems,
    });
    this.updateProps(updatedItems);
  };

  moveUp = (e, number) => {
    e.preventDefault();
    const { items } = this.state;
    if (number > 0) {
      const currentItem = items[number];
      const nextItem = items[number - 1];
      const updatedItems = [...items];
      updatedItems[number] = nextItem;
      updatedItems[number - 1] = currentItem;
      this.setState({
        items: updatedItems,
      });
      this.updateProps(updatedItems);
    }
  };

  moveDown = (e, number) => {
    e.preventDefault();
    const { items } = this.state;
    if (number < items.length - 1) {
      const currentItem = items[number];
      const nextItem = items[number + 1];
      const updatedItems = [...items];
      updatedItems[number] = nextItem;
      updatedItems[number + 1] = currentItem;
      this.setState({
        items: updatedItems,
      });
      this.updateProps(updatedItems);
    }
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
                key={item.id}
                id={item.id}
                handleItemChange={this.handleChange}
                deleteItem={this.deleteItem}
                moveDown={this.moveDown}
                moveUp={this.moveUp}
                number={number}
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
    const {
      id,
      type,
      question,
      min_rating_label,
      max_rating_label,
      options,
    } = this.props.item;
    return (
      <StyledSurveyBuilderItemLine>
        <div className="input">
          <div>Type</div>
          <select
            type="text"
            name={id}
            value={type}
            onChange={this.props.handleItemChange}
            className="type"
          >
            <option value="select">Multiple choice</option>
            <option value="vas">Visual scale</option>
          </select>

          <div>Question</div>
          <input
            type="text"
            name={id}
            value={question}
            onChange={this.props.handleItemChange}
            className="question"
          />

          {type === 'select' && (
            <>
              <div>Options</div>
              <textarea
                name={id}
                value={options}
                onChange={this.props.handleItemChange}
                className="options"
              />
            </>
          )}

          {type === 'vas' && (
            <>
              <div>Minimum value label</div>
              <input
                type="text"
                name={id}
                value={min_rating_label}
                onChange={this.props.handleItemChange}
                className="min_rating_label"
              />

              <div>Maximum value label</div>
              <input
                type="text"
                name={id}
                value={max_rating_label}
                onChange={this.props.handleItemChange}
                className="max_rating_label"
              />
            </>
          )}
        </div>
        <div className="controlButtons">
          <div className="deleteDiv">
            <button onClick={e => this.props.deleteItem(e, this.props.number)}>
              &times;
            </button>
          </div>
          <div className="moveButtons">
            <button onClick={e => this.props.moveUp(e, this.props.number)}>
              ↑
            </button>
            <button onClick={e => this.props.moveDown(e, this.props.number)}>
              ↓
            </button>
          </div>
        </div>
      </StyledSurveyBuilderItemLine>
    );
  }
}

export default SurveyBuilder;
