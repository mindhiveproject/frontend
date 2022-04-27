import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { Dropdown } from 'semantic-ui-react';

import { StyledBank, StyledDropdown } from '../styles';
import StudyCard from './studycard';
import ParticipatedStudiesBank from './participated';

import { ALL_PUBLIC_STUDIES_QUERY } from '../../Queries/Study';

const filterOptions = [
  {
    key: "All",
    text: "All studies",
    value: "All",
    content: "All studies"
  },
  {
    key: "Participated",
    text: "Studies I participated in",
    value: "Participated",
    content: "Studies I participated in"
  },
  {
    key: "Not participated",
    text: "Studies I haven't participated in",
    value: "Not participated",
    content: "Studies I haven't participated in"
  }
];

class StudiesBank extends Component {
  state = {
    filter: "All"
  }

  filterStudies = (event, data) => {
    this.setState({
      filter: data.value
    })
  }

  render() {
    return (
      <Query query={ALL_PUBLIC_STUDIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <></>;
          if (error) return <p>Error: {error?.message}</p>;
          const { studies } = data;

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

              {this.state.filter === "All" && (
                <StyledBank>
                  <div className="studies">
                    {studies.map(study => (
                      <StudyCard
                        key={study.id}
                        study={study}
                        onSelectStudy={this.props.onSelectStudy}
                      />
                    ))}
                  </div>
                </StyledBank>
              )}

              {this.state.filter === "Participated" && (
                <ParticipatedStudiesBank
                  onSelectStudy={this.props.onSelectStudy}
                />
              )}

              {this.state.filter === "Not participated" && (
                <ParticipatedStudiesBank
                  allStudies={studies}
                  onSelectStudy={this.props.onSelectStudy}
                />
              )}

            </>
          );
        }}
      </Query>
    );
  }
}

export default StudiesBank;
