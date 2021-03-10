import dynamic from 'next/dynamic';
import React, { Component, useState, useRef } from 'react';

const DynamicSketchField = dynamic(
  () => import('react-sketch').then(mod => mod.SketchField),
  { ssr: false }
);

const DynamicSketchTools = dynamic(
  () => import('react-sketch').then(mod => mod.Tools),
  { ssr: false }
);

export const Sketch = () => (
  <DynamicSketchField
    width="1024px"
    height="768px"
    tool={DynamicSketchTools.Pencil}
    lineColor="black"
    lineWidth={3}
  />
);
