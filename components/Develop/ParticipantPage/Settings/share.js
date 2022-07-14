import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';
import { StyledCard, StyledSettingsBlock } from '../styles';

class ShareStudy extends Component {
  state = {
    isCustomize: true,
  };

  copyLink = () => {
    const copyLink = `https://mindhive.science/studies/${this.props.study.slug}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
    alert('The link is copied');
  };

  render() {
    const { study, user } = this.props;

    const { isCustomize } = this.state;

    return (
      <div>
        <h2>Share your study</h2>

        <StyledCard>
          <h3>Study url</h3>
          {study.slug ? (
            <label htmlFor="slug" onClick={() => this.copyLink()}>
              <p className="accessLink">
                https://mindhive.science/studies/
                {study.slug}
              </p>
            </label>
          ) : (
            <p className="accessLink highlight">
              Customize your study url below
            </p>
          )}
        </StyledCard>

        <StyledCard>
          <StyledSettingsBlock>
            <div>
              <h3>Customize url</h3>
              <p>Customize your study url</p>
              {isCustomize && !this.props.needToClone && (
                <div>
                  <div>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={study.slug}
                      onChange={this.props.handleStudyChange}
                      required
                    />
                  </div>
                  <div>
                    A tip - avoid spaces in the url. Use dashes instead, for
                    example.
                  </div>
                </div>
              )}
            </div>
            <div className="input">
              <Radio
                toggle
                label={isCustomize ? 'On' : 'Off'}
                checked={isCustomize}
                onChange={() =>
                  this.setState({
                    isCustomize: !this.state.isCustomize,
                  })
                }
              />
            </div>
          </StyledSettingsBlock>
        </StyledCard>
      </div>
    );
  }
}

export default ShareStudy;
