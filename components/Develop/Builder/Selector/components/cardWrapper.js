import React, { Component } from 'react';

import Card from './card';

class CardWrapper extends Component {
  render() {
    const { component } = this.props;

    return (
      <Card
        key={component.id}
        component={component}
        openModal={this.props.openModal}
      />
    );
  }
}

export default CardWrapper;
