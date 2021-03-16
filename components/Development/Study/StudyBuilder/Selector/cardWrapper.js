import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../../Task/Preview/index';
import Card from '../../../Component/Card/index';

class CardWrapper extends Component {
  addToStudy = component => {
    this.props.onAddComponent({
      id: component.id,
      title: component.title,
    });
  };

  render() {
    const { component } = this.props;

    return (
      <Card
        key={component.id}
        component={component}
        onAddComponent={this.addToStudy}
        openTaskEditor={this.props.openTaskEditor}
      />
    );
  }
}

export default CardWrapper;
