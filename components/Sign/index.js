import React, { Component } from 'react';
import Link from 'next/link';
import { SignupForm, SignupButton } from './styles';

class Signup extends Component {
  render() {
    return (
      <SignupForm>
        <h1>Which role best describes you?</h1>

        <div className="signupOptions">
          <Link href="/signup/participant">
            <SignupButton>
              <div>
                <img
                  src="/static/assets/signup-participant.png"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>Study participant</div>
            </SignupButton>
          </Link>

          <Link href="/signup/student">
            <SignupButton>
              <div>
                <img
                  src="/static/assets/signup-student.png"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>Student</div>
            </SignupButton>
          </Link>

          <Link href="/signup/scientist">
            <SignupButton>
              <div>
                <img
                  src="/static/assets/signup-scientist.png"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>Scientist</div>
            </SignupButton>
          </Link>

          <Link href="/signup/teacher">
            <SignupButton>
              <div>
                <img
                  src="/static/assets/signup-teacher.png"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>Teacher</div>
            </SignupButton>
          </Link>
        </div>

        <span>
          Already have an account?{` `}
          <Link href="/login">
            <a>Login here</a>
          </Link>
        </span>
      </SignupForm>
    );
  }
}

export default Signup;
