import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from './styles';

import ExperimentPreview from '../../../../Task/Preview/index';
import Card from '../../../../Development/Component/Card/index';

import { NodesTypesContainer } from '../../Diagram/components/nodes-types-container/NodesTypesContainer';
import { NodeTypeLabel } from '../../Diagram/components/node-type-label/NodeTypeLabel';

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
      <NodesTypesContainer>
        <NodeTypeLabel
          model={{
            ports: 'in',
            name: component?.title,
            details: component?.description,
            componentID: component.id,
          }}
          name={component?.title}
        >
          <Card
            key={component.id}
            component={component}
            onAddComponent={this.addToStudy}
            openTaskEditor={this.props.openTaskEditor}
          />
        </NodeTypeLabel>
      </NodesTypesContainer>
    );
  }
}

export default CardWrapper;
