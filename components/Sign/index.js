import React, { Component } from 'react';
import Link from 'next/link';

class Signup extends Component {
  render() {
    return (
      <div>
        <h2>Which role best describes you?</h2>

        <div>
          <Link href="/signup/participant">
            <a>Study participant</a>
          </Link>
        </div>
        <div>
          <Link href="/signup/student">
            <a>Student</a>
          </Link>
        </div>
        <div>
          <Link href="/signup/scientist">
            <a>Scientist</a>
          </Link>
        </div>
        <div>
          <Link href="/signup/teacher">
            <a>Teacher</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
