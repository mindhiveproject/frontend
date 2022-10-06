import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import TemplateBuilder from './builder';

import {
  StyledStudyBuilder,
  StudyBuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledStudyBuilderPage,
} from './styles';

import { TEMPLATE_QUERY } from '../../Queries/Template';

class TemplateBuilderWrapper extends Component {
  render() {
    const { onLeave, templateId, user } = this.props;

    return (
      <Query query={TEMPLATE_QUERY} variables={{ id: templateId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.template)
            return <p>No template found for id {templateId}</p>;

          const { template } = data;

          return (
            <TemplateBuilder
              onLeave={this.props.onLeave}
              user={this.props.user}
              template={template}
            />
          );
        }}
      </Query>
    );
  }
}

export default TemplateBuilderWrapper;
