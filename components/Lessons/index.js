import React, { Component } from 'react';
import Link from 'next/link';
import { LessonTable } from './styles';

export default class Lessons extends Component {
  render() {
    const { lessons } = this.props;
    return (
      <div className="blog-list">
        {lessons.map(lesson => (
          <LessonTable key={lesson.slug}>
            <div>
              <h2>{lesson.attributes.title}</h2>
              <p>{lesson.attributes.text}</p>
              <button>
                <a target="_blank" href={lesson.attributes.link}>
                  Click this link
                </a>
              </button>
            </div>
            <div>
              <img src={lesson.attributes.thumbnail} height="200px" />
            </div>
          </LessonTable>
        ))}
        <style jsx>{`
          .blog-list a {
            display: block;
            text-align: center;
          }
          .blog-list img {
            max-width: 100%;
            max-height: 300px;
          }
        `}</style>
      </div>
    );
  }
}

// <Link href={`lessons/l/${lesson.slug}`} key={lesson.slug}>
//   <a>
//     <img src={lesson.attributes.thumbnail} />
//     <h2>{lesson.attributes.title}</h2>
//   </a>
// </Link>
