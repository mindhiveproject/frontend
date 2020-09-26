import React, { Component } from 'react';
import Link from 'next/link';

class UniversalBlock extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <ul>
          {data.map(item => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default UniversalBlock;
