import React, { Component } from 'react';
import Board from './board';

class IndividualReviewsWrapper extends Component {
  render() {
    const { reviews, view } = this.props;

    const byReviewers = reviews.map((review, num) => ({
      content: review.content.map(content => ({
        ...content,
        title: content.question,
      })),
      title: `Reviewer ${num + 1}`,
    }));

    // rearrange array
    const sections = reviews.map(review =>
      review.content.map(question => ({
        ...question,
        author: review.author.id,
      }))
    );
    const byQuestions = [1, 2, 3, 4, 5, 6].map(name => {
      const content = sections
        .map((section, num) =>
          section
            .filter(section => section.name == name)
            .map(section => ({
              answer: section.answer,
              title: `Reviewer ${num + 1}`,
              rating: section.rating,
              question: section.question,
            }))
        )
        .flat();
      return {
        name,
        title: content && content.length && content[0].question,
        content,
      };
    });

    return (
      <Board sections={view === 'byQuestion' ? byQuestions : byReviewers} />
    );
  }
}

export default IndividualReviewsWrapper;
