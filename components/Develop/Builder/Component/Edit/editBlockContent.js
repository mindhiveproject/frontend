import React, { Component } from 'react';
import styled from 'styled-components';

import { Jodit } from '../../../../Dashboard/Jodit/index';

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 18px;
`;

class EditBlockContent extends Component {
  handleContentChange = content => {
    const value = [
      {
        page: [
          {
            type: 'text',
            text: content,
          },
        ],
      },
    ];
    const packed = {
      target: {
        name: 'pages',
        type: 'survey',
        value: JSON.stringify(value),
      },
    };
    this.props.handleParameterChange(packed);
  };

  render() {
    const { text } = this.props;
    return (
      <StyledBasicPane>
        <h3>Body</h3>
        <p>What participants see when they arrive at the block</p>
        <Jodit
          externalContent={text}
          updateContent={this.handleContentChange}
        />
      </StyledBasicPane>
    );
  }
}

export default EditBlockContent;
