import React, { Component } from 'react';

import ConsentScreen from './consentScreen';

import { OnboardingDetails } from '../../../../Participate/styles';

class ConsentWrapper extends Component {
  state = {
    covered: false, // default of the page for saving of covered consent
    ...this.props.query, // put everything coming from query
    ...this.props.user?.generalInfo, // populate with user information
    numberOfConsents: this.props.study?.consent.length,
    activeConsent: 0,
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  recordMyConsent = async (consentId, decision) => {
    if (this.state.activeConsent + 1 < this.state.numberOfConsents) {
      this.setState({
        [`consent-${consentId}`]: decision,
        activeConsent: this.state.activeConsent + 1,
      });
    } else {
      const { blocks } = this.props.study.components;
      const activeBlocks = blocks.filter(b => !b.skip);
      // get a random block out of study between-subjects blocks
      const block =
        activeBlocks[Math.floor(Math.random() * activeBlocks.length)];
      const info = {
        blockId: block.blockId,
        blockName: block.title,
      };
      const studiesInfo = { [this.props.study.id]: info };

      this.props.onUpdateVirtualUser({
        ...this.props.user,
        generalInfo: {
          ...this.state,
          [`consent-${consentId}`]: decision,
        },
        hasRegistered: true,
        studiesInfo,
      });

      if (this.props.study?.settings?.proceedToFirstTask) {
        if (block?.tests.length) {
          const componentId = block?.tests.map(test => test?.id)[0];
          const versionId = block?.tests.map(test => test?.testId)[0];
          this.props.onStartTheTask({ window: 'task', componentId, versionId });
        } else {
          alert(
            `There are no tasks or surveys in the condition ${block?.title}`
          );
        }
      } else {
        this.props.onFinishRegistration({ window: 'study' });
      }
    }
  };

  componentDidMount() {
    if (document.querySelector('#OnboardingModal')) {
      document.querySelector('#OnboardingModal').scrollTo(0, 0);
    }
  }

  render() {
    const { user, study, query } = this.props;
    const { step, guest } = query;

    const consents = study?.consent?.filter(consent =>
      study?.consentId.includes(consent?.id)
    );

    const hasActiveConsent =
      study?.consentId.length && study?.settings?.consentObtained;

    // compute whether the person is under 18
    let under18;
    if (this.state.bd) {
      const diff = Date.now() - this.state.bd;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.2425;
      under18 = diff / millisecondsInYear < 18;
    }

    return (
      <OnboardingDetails>
        <ConsentScreen
          under18={under18}
          consent={consents[this.state.activeConsent]}
          sona={this.state.sona}
          studentNYC={this.state.studentNYC}
          covered={this.state.covered}
          updateState={this.updateState}
          consentNumber={this.state.activeConsent}
          numberOfConsents={this.state.numberOfConsents}
          recordMyConsent={this.recordMyConsent}
          hasActiveConsent={hasActiveConsent}
        >
          <>
            {under18 && (
              <>
                <div>
                  <label htmlFor="parentname">
                    <p>Parent name</p>
                    <input
                      type="text"
                      id="parentname"
                      name="parentname"
                      onChange={this.updateState}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="parentemail">
                    <p>Parent email address</p>
                    <input
                      type="email"
                      id="parentemail"
                      name="parentemail"
                      onChange={this.updateState}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="kidname">
                    <p>Your name</p>
                    <input
                      type="text"
                      id="kidname"
                      name="kidname"
                      onChange={this.updateState}
                    />
                  </label>
                </div>
              </>
            )}
          </>
        </ConsentScreen>
      </OnboardingDetails>
    );
  }
}

export default ConsentWrapper;
