import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const SketchField = dynamic(
  () => import('react-sketch').then(mod => mod.SketchField),
  { ssr: false }
);

const Tools = dynamic(() => import('react-sketch').then(mod => mod.Tools), {
  ssr: false,
});

const StyledSketch = styled.div`
  input,
  textarea,
  select {
    width: 100%;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: transparent;
    margin: 1px;
    border: 0px solid #e6e6e6;
    cursor: pointer;
  }
  border: 1px solid lightgrey;
  background: white;
  border-radius: 4px;
`;

class Sketch extends Component {
  convertToJson = () => {
    console.log('to JSON');
    this.toJSON();
  };

  render() {
    return (
      <>
        <div onClick={this.convertToJson}>Click</div>
        <StyledSketch>
          <SketchField
            width="1024px"
            height="768px"
            tool={Tools.Pencil}
            lineColor="green"
            lineWidth={3}
          ></SketchField>
        </StyledSketch>
      </>
    );
  }
}

export default Sketch;
