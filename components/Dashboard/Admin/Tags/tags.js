import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import styled from 'styled-components';
import { TAGS_QUERY } from '../../../Queries/Tag';

import TagRow from './TagstList/index';
import { StyledDasboard, StyledClassesDasboard } from '../../styles';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledTagHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

class Tags extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>Tags</h1>

          <Query query={TAGS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { tags } = data;
              if (tags.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any tags yet.</h3>
                    <p>Once you create a tag, it will appear here.</p>
                    <div className="navigationHeader">
                      <div></div>
                      <div>
                        <button onClick={this.props.addTag}>Create Tag</button>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div></div>
                    <div>
                      <button onClick={this.props.addTag}>Create Tag</button>
                    </div>
                  </div>
                  <div>
                    <StyledRow>
                      <StyledTagHeader>
                        <div>Title</div>
                        <div>Date created</div>
                        <div>Date updated</div>
                      </StyledTagHeader>
                      <div></div>
                    </StyledRow>

                    {tags.map(tag => (
                      <TagRow
                        tag={tag}
                        key={tag.id}
                        openTag={this.props.openTag}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Tags;
export { TAGS_QUERY };
