import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export const Jodit = ({ externalContent, updateContent }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(externalContent);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    allowTabNavigation: true,
    minHeight: 500,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => {
        if (newContent) {
          setContent(newContent.target.innerHTML);
          updateContent(newContent.target.innerHTML);
        }
      }}
      onChange={newContent => {}}
    />
  );
};
