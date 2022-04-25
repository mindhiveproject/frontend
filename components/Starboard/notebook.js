import React, { useState, useEffect } from 'react';
import { StarboardEmbed } from 'starboard-wrap';

const urlDev = 'http://192.168.0.143:9001/';
const urlDevOffice = 'http://134.34.42.77:9001/';
const urlProd = 'https://starboard.mindhive.science/';
const url = process.env.NODE_ENV === 'production' ? urlProd : urlDevOffice;

function Notebook({ isNew, content, updateContent }) {
  useEffect(() => {
    function initializeNotebook() {
      const mount = document.querySelector('#mount-point');

        while (mount.firstChild) {
          mount.removeChild(mount.lastChild);
        }

      const el = new StarboardEmbed({
        notebookContent: content,
        src: url,
        onContentUpdateMessage: message => {
          updateContent({ content: message?.content });
        },
      });
      mount.appendChild(el);
    }
    if(isNew){
      initializeNotebook()
    }
  }, [content, isNew, updateContent]); // prettier-ignore

  return <div id="mount-point"></div>;
}

export default Notebook;
