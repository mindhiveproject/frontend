/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { DiagramModel } from '@projectstorm/react-diagrams';
import uniqid from 'uniqid';

import { MyCreatorWidget } from './Diagram/components/my-creator-widget/MyCreatorWidget';
import { MyNodeModel } from './Diagram/components/MyNodeModel';
import { MyCommentModel } from './Diagram/components/MyCommentModel';
import { MyAnchorModel } from './Diagram/components/MyAnchorModel';

import ComponentViewer from './Component/wrapper.js';
import Settings from './Settings/index';

import { StyledBoard } from '../styles';
import { StyledDigram, StyledWrapper } from './Diagram/styles';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const Builder = React.memo(props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentModalID, setComponentModalID] = useState(null);
  const [testModalId, setTestModalId] = useState(null);
  const [node, setNode] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // force update canvas
  const forceUpdate = React.useReducer(bool => !bool)[1];

  const openComponentModal = ({
    node,
    isInfoOpen,
    isPreviewOpen,
    isEditorOpen,
  }) => {
    setComponentModalID(node?.options?.componentID);
    setTestModalId(node?.options?.testId);
    setIsModalOpen(true);
    setNode(node);
    setIsInfoOpen(isInfoOpen);
    setIsPreviewOpen(isPreviewOpen);
    setIsEditorOpen(isEditorOpen);
  };

  const closeComponentModal = () => {
    props.engine.getModel().setLocked(false); // unlock the model
    setComponentModalID(null);
    setIsModalOpen(false);
    setNode(null);
    setTestModalId(null);
    setIsInfoOpen(false);
    setIsPreviewOpen(false);
    setIsEditorOpen(false);
  };

  const shorten = (text) => {
    if (text && text.split(" ").length > 12) {
      const short = text
        .split(" ")
        .slice(0, 12)
        .join(" ");
      return `${short} ...`;
    }
    return text;
  };

  const updateCanvas = ({ task, operation }) => {
    const model = props?.engine?.model;
    const nodes = model.getNodes() || [];
    const componentID = node?.options?.componentID;
    const testId = node?.options?.testId;
    // use componentID to update multiple nodes with the same task
    nodes.forEach((n) => {
      if (
        (operation === "create" &&
          n?.options?.componentID === componentID &&
          n?.options?.testId === testId) ||
        (operation === "update" && n?.options?.componentID === componentID)
      ) {
        n.updateOptions({
          componentID: task?.id,
          name: task?.title,
          details: shorten(task?.description),
          subtitle: shorten(task?.subtitle),
        });
      }
    });
    props.engine.repaintCanvas();
  };

  const addComponentToCanvas = ({
    name,
    details,
    componentID,
    taskType,
    subtitle,
  }) => {
    const newNode = new MyNodeModel({
      color: 'white',
      name,
      details: shorten(details),
      componentID,
      testId: uniqid.time(),
      taskType,
      subtitle: shorten(subtitle),
    });
    const event = {
      clientX: getRandomIntInclusive(300, 500),
      clientY: getRandomIntInclusive(300, 500),
    };
    const point = props.engine.getRelativeMousePoint(event);
    newNode.setPosition(point);
    props.engine.getModel().addNode(newNode);
    forceUpdate();
  };

  const addStudyTemplateToCanvas = study => {
    const { diagram } = study;
    const model = new DiagramModel();
    model.deserializeModel(JSON.parse(diagram), props.engine);
    props.engine.setModel(model);
  };

  const addComment = () => {
    const note = new MyCommentModel({
      author: props?.user?.username,
      time: Date.now(),
      content: '',
    });
    const event = {
      clientX: getRandomIntInclusive(300, 500),
      clientY: getRandomIntInclusive(300, 500),
    };
    const point = props.engine.getRelativeMousePoint(event);
    note.setPosition(point);
    props.engine.getModel().addNode(note);
    forceUpdate();
  };

  const addAnchor = () => {
    const anchor = new MyAnchorModel({});
    const event = {
      clientX: getRandomIntInclusive(300, 500),
      clientY: getRandomIntInclusive(300, 500),
    };
    const point = props.engine.getRelativeMousePoint(event);
    anchor.setPosition(point);
    props.engine.getModel().addNode(anchor);
    forceUpdate();
  };

  return (
    <StyledBoard>
      <StyledWrapper>
        <button className="addCommentButton" onClick={addComment}>
          Add a comment
        </button>
        {!props.engine.model
          .getNodes()
          .filter(node => node?.options?.type === 'my-anchor').length && (
          <button className="addAnchorButton" onClick={addAnchor}>
            Add starting point
          </button>
        )}
        <StyledDigram>
          {props.engine && (
            <MyCreatorWidget
              engine={props.engine}
              openComponentModal={openComponentModal}
              openStudyPreview={props.toggleStudyPreview}
            />
          )}
        </StyledDigram>
        <Settings
          {...props}
          addComponentToCanvas={addComponentToCanvas}
          addStudyTemplateToCanvas={addStudyTemplateToCanvas}
        />
      </StyledWrapper>
      {isModalOpen && (
        <ComponentViewer
          {...props}
          componentID={componentModalID}
          testId={testModalId}
          closeModal={closeComponentModal}
          updateCanvas={updateCanvas}
          isInfoOpen={isInfoOpen}
          isPreviewOpen={isPreviewOpen}
          isEditorOpen={isEditorOpen}
        />
      )}
    </StyledBoard>
  );
});

export default Builder;
