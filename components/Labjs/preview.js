import React, { Component } from 'react';
import clonedeep from 'lodash.clonedeep';
import Head from 'next/head';
import * as lab from './lib/lab.js';
import { convert } from './functions';

class ExperimentWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { props } = this;
    const script = convert(props.settings.script);

    Object.assign(
      script.content[0] && script.content[0].parameters,
      props.settings.params || {}
    );
    this.study = lab.util.fromObject(clonedeep(script), lab);
    this.study.run();
    this.study.on('end', () => {
      props.settings.on_finish();
    });
    this.study.options.events.keydown = async e => {
      if (e.code === 'Escape') {
        if (this.study) {
          await this.study.internals.controller.audioContext.close();
          this.study = undefined;
          props.settings.on_finish();
        }
      }
    };
    // css style
    if (props.settings.style) {
      const styleNode = document.createElement('style');
      const embeddedStyle = props.settings.style.split('data:text/css,')[1];
      styleNode.innerHTML = window.decodeURIComponent(embeddedStyle);
      document.body.appendChild(styleNode);
    }
  }

  componentWillUnmount() {
    try {
      if (this.study) {
        this.study.internals.controller.audioContext.close();
        this.study.end();
      }
    } catch (e) {
      console.log('Experiment closed before unmount');
    }
  }

  render() {
    return (
      <>
        <Head>
          <link href="/static/lab.css" rel="stylesheet" />
        </Head>
        <div className="container fullscreen" data-labjs-section="main">
          <main className="content-vertical-center content-horizontal-center">
            <div>
              <h2>Loading Experiment</h2>
              <p>The experiment is loading and should start in a few seconds</p>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export { ExperimentWindow };
