import React, { Component } from 'react';
import Link from 'next/link';
import { SignupForm, SignupButton } from './styles';

class Signup extends Component {
  render() {
    return (
      <SignupForm>
        <h1>Which role best describes you?</h1>

        <Link href="/signup/participant">
          <SignupButton>Study participant</SignupButton>
        </Link>

        <Link href="/signup/student">
          <SignupButton>Student</SignupButton>
        </Link>

        <Link href="/signup/scientist">
          <SignupButton>Scientist</SignupButton>
        </Link>

        <Link href="/signup/teacher">
          <SignupButton>Teacher</SignupButton>
        </Link>

        <span>
          Already have an account?
          <Link href="/login">
            <a> Login here</a>
          </Link>
        </span>
      </SignupForm>
    );
  }
}

export default Signup;
