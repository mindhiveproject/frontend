import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { StyledParameterBlock, StyledIconSpan } from '../styles';

const iconOptions = [
  'clone outline',
  'clipboard outline',
  'star outline',
  'random',
  'question circle outline',
];

class EditTemplateParameters extends Component {
  parseIt = body => {
    try {
      const res = JSON.parse(body);
      return res.join('\n');
    } catch (e) {
      return body;
    }
  };

  render() {
    const {
      parameters,
      handleTemplateParamChange,
      deleteTemplateParameter,
    } = this.props;

    return (
      <div>
        {parameters.map(
          ({ name, value, type, help, example, options, array, icon }) => (
            <StyledParameterBlock key={name} htmlFor={name}>
              <div className="name">{name}</div>

              <div>Select the type of the parameter</div>
              <select
                type="text"
                name={name}
                value={type}
                onChange={handleTemplateParamChange}
                className="type"
              >
                <option value="string">Choose the type</option>
                <option value="text">Single-line text input</option>
                <option value="number">Number</option>
                <option value="textarea">Text</option>
                <option value="select">Select one</option>
              </select>

              <div>Select the icon</div>
              <div className="iconSelector">
                {iconOptions.map((iconName, num) => (
                  <StyledIconSpan
                    key={num}
                    isSelected={iconName === icon}
                    onClick={() => {
                      handleTemplateParamChange(
                        {
                          target: {
                            name,
                            type: 'text',
                            value: iconName,
                            className: 'icon',
                          },
                        },
                        'icon'
                      );
                    }}
                  >
                    <Icon name={iconName} style={{ color: '#556AEB' }} />
                  </StyledIconSpan>
                ))}
              </div>

              <div>
                Provide instructions for other users to understand what this
                parameter changes in the task
              </div>
              <textarea
                name={name}
                value={help}
                onChange={handleTemplateParamChange}
                className="help"
              />

              <div>An example of what can be the parameter value</div>
              <textarea
                name={name}
                value={example}
                onChange={handleTemplateParamChange}
                className="example"
              />

              {type === 'select' && (
                <>
                  <div>The options (each on a new line) for this parameter</div>
                  <textarea
                    name={name}
                    value={options}
                    onChange={handleTemplateParamChange}
                    className="options"
                  />
                </>
              )}

              <div>The default value for this parameter</div>
              <textarea
                name={name}
                value={value}
                onChange={handleTemplateParamChange}
                className="value"
              />

              <button onClick={e => deleteTemplateParameter(e, name)}>
                Delete
              </button>
            </StyledParameterBlock>
          )
        )}
      </div>
    );
  }
}

export default EditTemplateParameters;
