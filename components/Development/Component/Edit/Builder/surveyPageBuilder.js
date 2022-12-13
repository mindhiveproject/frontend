import React, { Component } from 'react';
import uniqid from 'uniqid';
import { StyledSurveyBuilderItemLine } from '../../styles';

class SurveyPageBuilder extends Component {
  state = {
    items: this.props.items,
    timeout: this.props.timeout,
    hideContinueBtn: this.props.hideContinueBtn,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
    }
    if (prevProps.timeout !== this.props.timeout) {
      this.setState({ timeout: this.props.timeout });
    }
    if (prevProps.hideContinueBtn !== this.props.hideContinueBtn) {
      this.setState({ hideContinueBtn: this.props.hideContinueBtn });
    }
  }

  updateProps = ({ page, timeout, hideContinueBtn }) => {
    this.props.onChange({ page, timeout, hideContinueBtn });
  };

  handleChange = e => {
    const { id, value, className, name } = e.target;
    const { items } = this.state;
    let updatedItems;
    if (className === 'options' || className === 'items') {
      const updatedOptions = items
        .filter(item => item.id == name)
        .map(item => item[className]);
      const options = updatedOptions[0];
      options[id] = value;
      updatedItems = items.map(item =>
        item.id == name ? { ...item, [className]: options } : item
      );
    } else {
      updatedItems = items.map(item =>
        item.id == name ? { ...item, [className]: value } : item
      );
    }
    this.setState({
      items: updatedItems,
    });
    this.updateProps({
      page: updatedItems,
      timeout: this.state.timeout,
      hideContinueBtn: this.state.hideContinueBtn,
    });
  };

  handleTimeoutChange = e => {
    const { value } = e.target;
    this.setState({
      timeout: value,
    });
    this.updateProps({
      page: this.state.items,
      timeout: value,
      hideContinueBtn: this.state.hideContinueBtn,
    });
  };

  handleHideContinueBtnChange = e => {
    const value = e.target.checked;
    this.setState({
      hideContinueBtn: value,
    });
    this.updateProps({
      page: this.state.items,
      timeout: this.state.timeout,
      hideContinueBtn: value,
    });
  };

  addNewOption = (e, id, className) => {
    e.preventDefault();
    const { items } = this.state;
    const updatedOptions = items
      .filter(item => item.id === parseInt(id))
      .map(item => item[className])
      .map(opts => opts.concat(['']));
    const options = updatedOptions[0];
    const updatedItems = items.map(item =>
      item.id === parseInt(id) ? { ...item, [className]: options } : item
    );
    this.setState({
      items: updatedItems,
    });
    this.updateProps({
      page: updatedItems,
      timeout: this.state.timeout,
      hideContinueBtn: this.state.hideContinueBtn,
    });
  };

  deleteOption = (e, id, num, className) => {
    e.preventDefault();
    const { items } = this.state;
    const updatedOptions = items
      .filter(item => item.id === parseInt(id))
      .map(item => item[className]);
    const options = updatedOptions[0].filter(
      (opts, number) => number !== parseInt(num)
    );
    const updatedItems = items.map(item =>
      item.id === parseInt(id) ? { ...item, [className]: options } : item
    );
    this.setState({
      items: updatedItems,
    });
    this.updateProps({
      page: updatedItems,
      timeout: this.state.timeout,
      hideContinueBtn: this.state.hideContinueBtn,
    });
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
        id: uniqid.time(),
        type: 'text',
        header: '',
        text: '',
        question: '',
        min_rating_label: '',
        max_rating_label: '',
        min_value: '',
        max_value: '',
        options: [''],
        items: [''],
      },
    ];
    this.setState({
      items: updatedItems,
    });
    this.updateProps({
      page: updatedItems,
      timeout: this.state.timeout,
      hideContinueBtn: this.state.hideContinueBtn,
    });
  };

  deleteItem = (e, number) => {
    e.preventDefault();
    const updatedItems = this.state.items.filter((item, num) => num !== number);
    this.setState({
      items: updatedItems,
    });
    this.updateProps({
      page: updatedItems,
      timeout: this.state.timeout,
      hideContinueBtn: this.state.hideContinueBtn,
    });
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
      this.updateProps({
        page: updatedItems,
        timeout: this.state.timeout,
        hideContinueBtn: this.state.hideContinueBtn,
      });
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
      this.updateProps({
        page: updatedItems,
        timeout: this.state.timeout,
        hideContinueBtn: this.state.hideContinueBtn,
      });
    }
  };

  render() {
    const { items, timeout, hideContinueBtn } = this.state;
    if (items) {
      return (
        <div>
          {items && items.length > 0 && (
            <>
              <div className="hideContinueBtn">
                <div>
                  <input
                    type="checkbox"
                    id="hideContinueBtn"
                    name="hideContinueBtn"
                    checked={hideContinueBtn}
                    onChange={this.handleHideContinueBtnChange}
                  />
                </div>
                <div>
                  <label htmlFor="hideContinueBtn">Hide Continue button</label>
                </div>
              </div>
              <div className="timeout">
                <p>Page timeout (in milliseconds)</p>
                <input
                  type="number"
                  name="timeout"
                  value={timeout}
                  onChange={this.handleTimeoutChange}
                  className="timeout"
                />
              </div>

              <div>
                {items.map((item, number) => (
                  <Item
                    item={item}
                    key={number}
                    id={item.id}
                    handleItemChange={this.handleChange}
                    deleteItem={this.deleteItem}
                    moveDown={this.moveDown}
                    moveUp={this.moveUp}
                    number={number}
                    addNewOption={this.addNewOption}
                    deleteOption={this.deleteOption}
                  />
                ))}
              </div>
            </>
          )}
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
      header,
      text,
      question,
      min_rating_label,
      max_rating_label,
      min_value,
      max_value,
      options,
      items,
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
            <option value="text">Text</option>
            <option value="select">Multiple choice (select one)</option>
            <option value="checkbox">
              Multiple choice (select many options)
            </option>
            <option value="freeinput">Text input</option>
            <option value="vas">Visual scale</option>
            <option value="likert">Likert scale</option>
            <option value="block">Block</option>
          </select>

          {type !== 'block' && (
            <>
              <div>Header</div>
              <input
                type="text"
                name={id}
                value={header}
                onChange={this.props.handleItemChange}
                className="header"
              />
            </>
          )}

          {type === 'text' && (
            <>
              <div>Text</div>
              <textarea
                type="text"
                name={id}
                value={text}
                onChange={this.props.handleItemChange}
                className="text"
              />
            </>
          )}

          {(type === 'select' || type === 'checkbox' || type === 'likert') && (
            <>
              <div>Options</div>
              {options.map((option, num) => (
                <div key={num} className="optionRow">
                  <input
                    key={num}
                    id={num}
                    type="text"
                    name={id}
                    value={option}
                    onChange={this.props.handleItemChange}
                    className="options"
                  />
                  <button
                    onClick={e =>
                      this.props.deleteOption(e, id, num, 'options')
                    }
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                onClick={e => this.props.addNewOption(e, id, 'options')}
                className="addOptionButton"
              >
                + option
              </button>
            </>
          )}

          {type === 'likert' && (
            <>
              <div>Items for the Likert Scale</div>
              {items.map((item, num) => (
                <div key={num} className="optionRow">
                  <input
                    key={num}
                    id={num}
                    type="text"
                    name={id}
                    value={item}
                    onChange={this.props.handleItemChange}
                    className="items"
                  />
                  <button
                    onClick={e => this.props.deleteOption(e, id, num, 'items')}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                onClick={e => this.props.addNewOption(e, id, 'items')}
                className="addOptionButton"
              >
                + item
              </button>
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

              <div>Minimum value</div>
              <input
                type="number"
                name={id}
                value={min_value}
                onChange={this.props.handleItemChange}
                className="min_value"
              />

              <div>Maximum value</div>
              <input
                type="number"
                name={id}
                value={max_value}
                onChange={this.props.handleItemChange}
                className="max_value"
              />
            </>
          )}

          {type === 'block' && (
            <>
              <div>Content</div>
              <textarea
                type="text"
                name={id}
                value={text}
                onChange={this.props.handleItemChange}
                className="text"
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

export default SurveyPageBuilder;
