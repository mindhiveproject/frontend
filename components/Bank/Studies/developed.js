import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react';

import { StyledBank, StyledZeroState, StyledDropdown } from '../styles';
import StudyCard from './studycard';

const MY_DEVELOPED_STUDIES_QUERY = gql`
  query MY_DEVELOPED_STUDIES_QUERY {
    myStudies {
      id
      title
      slug
      image
      author {
        id
        permissions
      }
      collaborators {
        id
        username
        permissions
      }
      participants {
        id
      }
      guests {
        id
      }
      public
      shortDescription
      isHidden
    }
  }
`;

const filterOptions = [
  {
    key: 'All',
    text: 'All studies',
    value: 'All',
    content: <p>All</p>
  },
  {
    key: 'Active',
    text: 'Active studies',
    value: 'Active',
    content: <p>Active</p>
  },
  {
    key: 'Archived',
    text: 'Archived studies',
    value: 'Archived',
    content: <p>Archived</p>
  }
];

class DevelopedStudiesBank extends Component {
  state = {
    filter: 'All'
  }

  filterStudies = (event, data) => {
    this.setState({
      filter: data.value
    })
  }

  render() {

    return (
      <>
        <Query query={MY_DEVELOPED_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const studies = data.myStudies;
            if (studies.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a study yet.</h2>
                    <p>
                      Once you develop your first study, it will appear here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }

            let filteredStudies = studies;
            let studiesIDsToHide = [];
            if (this.props.user?.studiesInfo) {
              studiesIDsToHide = studies
                .filter(
                  st => this.props.user?.studiesInfo[st?.id]?.hideInDevelop
                )
                .map(study => study.id);
            }

            switch (this.state.filter) {
              case 'Active':
                filteredStudies = studies.filter(
                  study => !studiesIDsToHide.includes(study?.id)
                );
              break;
              case 'Archived':
                filteredStudies = studies.filter(
                  study => studiesIDsToHide.includes(study?.id)
                );
              break;
            }

            return (
              <>
                <StyledDropdown>
                  <Dropdown
                    selection
                    fluid
                    value={this.state.filter}
                    options={filterOptions}
                    onChange={this.filterStudies}
                  />
                </StyledDropdown>
                <StyledBank>
                  <div className="studies">
                    {filteredStudies.map(study => (
                      <StudyCard
                        key={study.id}
                        study={study}
                        onSelectStudy={this.props.onSelectStudy}
                        user={this.props.user}
                        developingMode
                        showAllStudies={this.props.showAllStudies}
                      />
                    ))}
                  </div>
                </StyledBank>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default DevelopedStudiesBank;
export { MY_DEVELOPED_STUDIES_QUERY };
