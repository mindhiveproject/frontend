import React, { useEffect } from 'react';

const urlDev = 'http://192.168.0.143:9001/';
const urlDevOffice = 'http://134.34.42.77:9001/';
const urlProd = 'https://starboard.mindhive.science/';

const url = process.env.NODE_ENV === 'development' ? urlProd : urlProd;

class Notebook extends React.Component {
  state = {
    star: undefined,
  };

  componentDidMount() {
    const { StarboardEmbed } = require('./starboardWrapper');
    this.setState({
      star: StarboardEmbed,
    });

    const mount = document.querySelector('#mount-point');
    while (mount.firstChild) {
      mount.removeChild(mount.lastChild);
    }

    const el = new StarboardEmbed({
      notebookContent: this.props.content,
      src: url,
      onContentUpdateMessage: message => {
        this.props.updateContent({ content: message?.content });
      },
    });
    mount.appendChild(el);
  }

  componentDidUpdate() {
    if (this.props.isNew) {
      const mount = document.querySelector('#mount-point');
      while (mount.firstChild) {
        mount.removeChild(mount.lastChild);
      }

      const el = new this.state.star({
        notebookContent: this.props.content,
        src: this.props.url,
        onContentUpdateMessage: message => {
          this.props.updateContent({ content: message?.content });
        },
      });
      mount.appendChild(el);
    }
  }

  render() {
    return <div id="mount-point"></div>;
  }
}

export default Notebook;
