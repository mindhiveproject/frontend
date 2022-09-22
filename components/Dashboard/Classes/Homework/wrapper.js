import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import { GET_HOMEWORK } from '../../../Queries/Homework';

import HomeworkModal from './modal';

class HomeworkWrapper extends Component {
  render() {
    return (
      <Query query={GET_HOMEWORK} variables={{ id: this.props.homeworkId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.homework)
            return <p>No homework found for id {this.props.homeworkId}</p>;
          const { homework } = data;
          return (
            <HomeworkModal
              homework={homework}
              assignmentTitle={this.props.assignmentTitle}
              goBack={this.props.goBack}
            />
          );
        }}
      </Query>
    );
  }
}

export default HomeworkWrapper;
