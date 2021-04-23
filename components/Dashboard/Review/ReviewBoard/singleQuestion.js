import React, { Component } from 'react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component'; // https://www.npmjs.com/package/react-rating-stars-component

const StyledReviewItem = styled.div`
  display: grid;
  grid-gap: 5px;
`;

class SingleQuestion extends Component {
  render() {
    const { item } = this.props;
    return (
      <StyledReviewItem>
        <div>
          <p>{item.question}</p>
        </div>
        <div>
          <ReactStars
            count={5}
            onChange={value =>
              this.props.handleChange({
                target: {
                  id: item.name,
                  value,
                  className: 'rating',
                  name: item.name,
                },
              })
            }
            size={24}
            activeColor="#ffd700"
            isHalf
            value={item.rating}
          />
        </div>
        <div>
          <textarea
            type="text"
            id={item.name}
            name={item.name}
            value={item.answer}
            className="answer"
            onChange={this.props.handleChange}
          />
        </div>
      </StyledReviewItem>
    );
  }
}

export default SingleQuestion;
