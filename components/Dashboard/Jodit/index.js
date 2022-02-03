import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export const Jodit = ({ externalContent, updateContent, readonly }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(externalContent);

  let config; // all options from https://xdsoft.net/jodit/doc/
  if (readonly) {
    config = {
      readonly,
      activeButtonsInReadOnly: ['print'], // active only two buttons
      toolbarButtonSize: 'large',
      buttons: ['print'],
      height: '100%',
    };
  } else {
    config = {
      allowTabNavigation: true,
      minHeight: 500,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      // theme: 'dark',
    };
  }

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => {
        if (newContent) {
          console.log('newContent', newContent);
          setContent(newContent);
          updateContent(newContent);
          // setContent(newContent?.target?.innerHTML);
          // updateContent(newContent?.target?.innerHTML);
        }
      }}
      onChange={newContent => {}}
    />
  );
};
