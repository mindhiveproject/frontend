import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';

const StyledStudyLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-column-gap: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  align-items: center;
  button {
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
`;

class StudyLine extends Component {
  render() {
    const { study } = this.props;
    const authors = [
      study?.author?.username,
      study.collaborators.map(c => c.username),
    ].join(', ');
    return (
      <StyledStudyLine>
        <h1>{study.title}</h1>
        <p>{authors}</p>
        <h2>{study.participants.length} participants signed up</h2>
        <h3>{moment(study.createdAt).format('dddd, MMMM Do YYYY, h:mm a')}</h3>
        <div>https://mindhive/studies/{study.slug}</div>
        <Link href="/studies/[slug]" as={`/studies/${study.slug}`}>
          <a>
            <h2>
              <button>Go to study page</button>
            </h2>
          </a>
        </Link>
      </StyledStudyLine>
    );
  }
}

export default StudyLine;
