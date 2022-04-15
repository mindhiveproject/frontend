import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import ReactStars from 'react-rating-stars-component'; // https://www.npmjs.com/package/react-rating-stars-component
import styled from 'styled-components';

const StyledReviewOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  font-family: Lato;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  .section {
    display: grid;
    grid-gap: 1rem;
    min-width: 300px;
    background: white;
    padding: 20px;
    text-align: left;
    align-content: baseline;
    .title {
      font-weight: bold;
      font-size: 1.3rem;
    }
    .answer {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 1rem;
      background-color: #f6f9f8;
      padding: 1rem;
      border-radius: 5px;
    }
    .averageRating {
      display: grid;
      grid-template-columns: 1fr;
      align-items: start;
      justify-self: start;
    }
  }
`;

function ReviewModal({ review, student }) {
  const [open, setOpen] = React.useState(false);
  const { content, title } = review;
  const { username } = student;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon name="external alternate" />}
    >
      <Modal.Header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gridGap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                color: 'lightgrey',
              }}
            >
              Author
            </div>
            {username}
          </div>
          <div>
            <div
              style={{
                color: 'lightgrey',
              }}
            >
              Study
            </div>
            {title}
          </div>
        </div>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <StyledReviewOverview>
            {content.map((section, num) => (
              <div key={num} className="section">
                <div className="title">
                  {section.name}. {section.question}
                </div>
                <div>{section.text}</div>
                <div className="answer">
                  <div>{section.answer}</div>
                  {section?.rating && (
                    <div className="averageRating">
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf
                        value={section?.rating}
                        edit={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </StyledReviewOverview>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ReviewModal;
