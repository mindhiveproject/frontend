import React, { Component } from 'react';
import clonedeep from 'lodash.clonedeep';
import Head from 'next/head';
import * as lab from './lib/lab';

import rating from './scripts/rating';
import risk from './scripts/risktaking';
import survey from './scripts/survey';

class ExperimentWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { props } = this;
    console.log(
      'props.settings.script',
      props.settings.script,
      props.settings.params
    );
    switch (props.settings.script) {
      case 'Risk taking task':
        risk.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(risk), lab);
        break;
      case 'Rating task':
        rating.parameters = props.settings.params;
        this.study = lab.util.fromObject(clonedeep(rating), lab);
        break;
      case 'Survey template':
      default:
        survey.parameters = props.settings.params;
        console.log('survey.parameters', survey.parameters);
        this.study = lab.util.fromObject(clonedeep(survey), lab);
        break;
    }
    this.study.run();
    this.study.on('end', () => {
      props.settings.on_finish();
    });
    this.study.options.events.keydown = async e => {
      if (e.code === 'Escape') {
        if (this.study) {
          await this.study.internals.controller.audioContext.close();
          this.study.end();
        }
      }
    };
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
        <div data-labjs-section="main">
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
