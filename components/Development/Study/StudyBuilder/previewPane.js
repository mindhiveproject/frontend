import React, { Component } from 'react';
import slugify from 'slugify';
import { Container, Draggable } from 'react-smooth-dnd';
import uniqid from 'uniqid';
import Block from './Preview/block';
import InfoTabs from './Preview/infoTabs';
import { UploadImageContainer } from '../styles';
import Board from './Board/index';

class PreviewPane extends Component {
  state = {
    viewing: 'before',
  };

  openTaskSelector = () => {
    this.props.toggleTaskSelector(true);
  };

  handleTitleChange = e => {
    if (this.props.needToClone) {
      const slug = slugify(e.target.value, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
      });
      this.props.handleSetMultipleValuesInState({
        title: e.target.value,
        slug,
      });
    } else {
      this.props.handleSetMultipleValuesInState({
        title: e.target.value,
      });
    }
  };

  onDrop = e => {
    // console.log('e', e);
    // if (e.removedIndex !== e.addedIndex) {
    //   this.props.onMoveComponent(e.removedIndex, e.addedIndex, e.payload);
    // }
  };

  render() {
    const { study } = this.props;
    const infoBlocks =
      study?.info?.reduce((acc, el) => {
        acc[el.name] = el.text;
        return acc;
      }, {}) || {};

    // get the study components or initialize an empty array
    let blocks = [];
    if (study.components) {
      if (study.components.blocks) {
        blocks = study.components.blocks;
      } else {
        const upgradedComponents = study.components.map(component => ({
          id: component.id,
          testId: uniqid.time(),
          title: component.title,
        }));
        blocks = [
          {
            blockId: uniqid.time(),
            title: 'Main experiment sequence',
            tests: upgradedComponents,
          },
        ];
      }
    }

    return (
      <div>
        <UploadImageContainer>
          <div
            className={
              study.image
                ? 'upload-btn-wrapper-with-image'
                : 'upload-btn-wrapper'
            }
          >
            <button className="btn">
              {study.image ? 'Update study image' : 'Upload study image'}
            </button>
            <input
              type="file"
              id="file"
              name="file"
              value={study.file}
              onChange={e => this.props.uploadImage(e)}
            />
            {study.image && (
              <img width="300" src={study.image} alt="Upload preview" />
            )}
          </div>
        </UploadImageContainer>

        <div>
          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={study.title}
              onChange={this.handleTitleChange}
              required
              className="title"
            />
          </label>
        </div>

        <div>
          <label htmlFor="description">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={study.description}
              onChange={this.props.handleStudyChange}
              rows="7"
              className="description"
            />
          </label>
        </div>

        <div>
          <button
            onClick={() => {
              // console.log('participate');
            }}
          >
            Participate
          </button>
        </div>

        <div className="timeInformationBlock">
          <div>
            <label htmlFor="time">
              Time to complete
              <div className="completeTimeLine">
                <img
                  src="/static/assets/study-builder-complete-time.svg"
                  alt="icon"
                  width="24"
                />
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={infoBlocks.time}
                  onChange={this.props.handleParameterChange}
                  className="text"
                />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="frequency">
              Frequency
              <input
                type="text"
                id="frequency"
                name="frequency"
                value={infoBlocks.frequency}
                onChange={this.props.handleParameterChange}
                className="text"
              />
            </label>
          </div>
        </div>

        <div>
          <div>
            <InfoTabs
              infoBlocks={infoBlocks}
              handleParameterChange={this.props.handleParameterChange}
              deleteParameter={this.props.deleteParameter}
              study={study}
            />
          </div>

          <div>
            <div className="procedureTabContainer">
              <div className="description">Procedure</div>
              <div className="viewingBtnsContainer">
                <div>
                  <p>Viewing:</p>
                </div>
                <div className="viewingBtns">
                  <button
                    onClick={() => this.setState({ viewing: 'before' })}
                    className={
                      this.state.viewing === 'before'
                        ? 'selectedBtn'
                        : 'nonSelectedBtn'
                    }
                  >
                    Before participation
                  </button>
                  <button
                    onClick={() => this.setState({ viewing: 'after' })}
                    className={
                      this.state.viewing === 'after'
                        ? 'selectedBtn'
                        : 'nonSelectedBtn'
                    }
                  >
                    After participation
                  </button>
                </div>
              </div>
            </div>

            <Board
              blocks={blocks}
              openTaskEditor={this.props.openTaskEditor}
              viewing={this.state.viewing}
              updateComponents={this.props.updateComponents}
            />

            <div>
              <button className="lightBtn" onClick={this.openTaskSelector}>
                Add a task or survey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewPane;

// {false && (
//   <div>
//     {components.map((component, blockNumber) => (
//       <Block
//         key={blockNumber}
//         blockNumber={blockNumber}
//         block={component}
//         onRemoveComponent={this.props.onRemoveComponent}
//         openTaskEditor={this.props.openTaskEditor}
//         viewing={this.state.viewing}
//         onUpdateBlock={this.props.onUpdateBlock}
//         onDrop={this.onDrop}
//       />
//     ))}
//   </div>
// )}
//
