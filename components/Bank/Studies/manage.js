import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { Radio } from 'semantic-ui-react';

import styled from 'styled-components';

const StyledToggle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 1rem 2rem;
`;

const TOGGLE_STUDY_SETTINGS = gql`
  mutation TOGGLE_STUDY_SETTINGS(
    $id: ID!
    $public: Boolean
    $featured: Boolean
  ) {
    manageStudyVisibility(id: $id, public: $public, featured: $featured) {
      id
      slug
      public
      featured
    }
  }
`;

class PublishStudy extends Component {
  render() {
    const { id, isPublic, isFeatured } = this.props;
    return (
      <Mutation mutation={TOGGLE_STUDY_SETTINGS} variables={{ id }}>
        {(toggleStudySetting, { loading, error }) => (
          <StyledToggle>
            <Radio
              toggle
              onClick={() => {
                if (isPublic) {
                  toggleStudySetting({
                    variables: { public: !isPublic, featured: false },
                  });
                } else {
                  toggleStudySetting({ variables: { public: !isPublic } });
                }
              }}
              label="Public"
              checked={isPublic}
            />
            {isPublic && (
              <Radio
                toggle
                onClick={() =>
                  toggleStudySetting({ variables: { featured: !isFeatured } })
                }
                label="Featured"
                checked={isFeatured}
              />
            )}
          </StyledToggle>
        )}
      </Mutation>
    );
  }
}

export default PublishStudy;
