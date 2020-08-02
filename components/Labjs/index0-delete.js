import React, { Component } from 'react';
import clonedeep from 'lodash.clonedeep';
import Head from 'next/head';
import * as lab from './lib/lab';

import rating from './scripts/rating';
import risk from './scripts/risktaking';
import survey from './scripts/survey';
import flanker from './scripts/flanker';

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
        risk.plugins = [
          {
            type: 'lab.plugins.Transmit',
            url: `/.netlify/functions/incremental/?user=${props.settings.user}&experiment=${props.settings.experiment}&custom=${props.settings.customExperiment}&policy=${props.settings.policy}`,
            callbacks: {},
          },
        ];
        this.study = lab.util.fromObject(clonedeep(risk), lab);
        break;
      case 'Rating task':
        rating.parameters = props.settings.params;
        rating.plugins = [
          {
            type: 'lab.plugins.Transmit',
            url: `/.netlify/functions/incremental/?user=${props.settings.user}&experiment=${props.settings.experiment}&custom=${props.settings.customExperiment}&policy=${props.settings.policy}`,
            callbacks: {},
          },
        ];
        this.study = lab.util.fromObject(clonedeep(rating), lab);
        break;
      case 'Flanker Task':
        flanker.parameters = props.settings.params;
        flanker.plugins = [
          {
            type: 'lab.plugins.Transmit',
            url: `/.netlify/functions/incremental/?user=${props.settings.user}&experiment=${props.settings.experiment}&custom=${props.settings.customExperiment}&policy=${props.settings.policy}`,
            callbacks: {},
          },
        ];
        this.study = lab.util.fromObject(clonedeep(flanker), lab);
        break;
      case 'Survey template':
      default:
        survey.parameters = props.settings.params;
        survey.plugins = [
          {
            type: 'lab.plugins.Transmit',
            url: `/.netlify/functions/incremental/?user=${props.settings.user}&experiment=${props.settings.experiment}&custom=${props.settings.customExperiment}&policy=${props.settings.policy}`,
            callbacks: {},
          },
        ];
        this.study = lab.util.fromObject(clonedeep(survey), lab);
        break;
    }
    this.study.run();
    this.study.on('end', () => {
      // const csv = this.study.options.datastore.exportCsv();
      const json = this.study.options.datastore.data;
      this.study = undefined;
      props.settings.on_finish(json);
    });
    this.study.parameters.callbackForEEG = e => {
      props.settings.eventCallback(e);
    };
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
