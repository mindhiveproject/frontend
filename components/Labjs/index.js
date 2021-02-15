import React, { Component } from 'react';
import clonedeep from 'lodash.clonedeep';
import Head from 'next/head';
import { convert } from './functions';

import * as lab from './lib/lab.js';

class ExperimentWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      user, // user id
      template, // the id of the original task
      task, // the id of the test
      study, // the id of the study
      policy, // the data policy chosen by the user
      params, // the test parameters
      style, // the css style
    } = this.props.settings;

    const script = convert(this.props.settings.script);

    if (policy !== 'no' && policy !== 'preview') {
      script.plugins = [
        ...script.plugins,
        {
          type: 'lab.plugins.Transmit',
          url: `/.netlify/functions/internal/?user=${user}&template=${template}&task=${task}&study=${study}&policy=${policy}`,
          callbacks: {},
        },
      ];
    }

    Object.assign(
      script.content[0] && script.content[0].parameters,
      params || {}
    );

    this.study = lab.util.fromObject(clonedeep(script), lab);

    this.study.run();

    this.study.on('end', () => {
      // compute aggregated data here?
      // debugger;
      const token =
        (this.study?.plugins &&
          this.study.plugins.plugins
            .filter(plugin => plugin.metadata)
            .map(plugin => plugin.metadata.id)[0]) ||
        'error';
      this.study = undefined;
      this.props.settings.on_finish(token);
    });

    // can be used as a callback in case of the event inside of lab.js task
    // this.study.parameters.eventCallback = e => {
    //   props.settings.eventCallback(e);
    // };

    this.study.options.events.keydown = async e => {
      if (e.code === 'Escape') {
        let answer;
        if (policy !== 'preview') {
          answer = confirm(
            'Are you sure you want to interrupt your task without finishing? You will have to start this task from the beginning.'
          );
        }
        if (answer === true || policy === 'preview') {
          if (this.study) {
            const token =
              (this.study.plugins &&
                this.study.plugins.plugins
                  .filter(plugin => plugin.metadata)
                  .map(plugin => plugin.metadata.id)[0]) ||
              'error';
            await this.study.internals.controller.audioContext.close();
            this.study = undefined;
            this.props.settings.on_finish(token);
          }
        }
      }
    };

    // css style
    if (style) {
      const styleNode = document.createElement('style');
      const embeddedStyle = style.split('data:text/css,')[1];
      styleNode.innerHTML = window.decodeURIComponent(embeddedStyle);
      document.body.appendChild(styleNode);
    }
  }

  componentWillUnmount() {
    try {
      if (this.study) {
        this.study.internals.controller.audioContext.close();
        alert(
          'The study has been interrupted. Sorry, the next time you do the same task or survey, you will have to start from the beginning!'
        );
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
