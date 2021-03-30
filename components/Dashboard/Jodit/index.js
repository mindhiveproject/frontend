import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export const Jodit = ({ externalContent, updateContent, readonly }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(externalContent);

  let config;
  if (readonly) {
    config = {
      // readonly, // all options from https://xdsoft.net/jodit/doc/
      minHeight: 500,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      activeButtonsInReadOnly: ['custom'], // active only two buttons
      toolbarButtonSize: 'large',
      buttons: [
        {
          name: 'custom',
          icon: 'print',
          exec(editor) {
            // if (editor.selection.isCollapsed()) {
            //   editor.execCommand('selectall');
            // }
            // print();
            // console.log('custom button');
            const printFun = async () => {
              await editor.execCommand('print');
            };
            printFun();
          },
        },
      ],
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
          setContent(newContent.target.innerHTML);
          updateContent(newContent.target.innerHTML);
        }
      }}
      onChange={newContent => {}}
    />
  );
};
