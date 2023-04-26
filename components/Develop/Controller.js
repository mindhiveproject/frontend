import React, { Component } from "react";
import uniqid from "uniqid";
import createEngine, {
  DiagramModel,
  DefaultDiagramState,
} from "@projectstorm/react-diagrams";

import generate from "project-name-generator";
import Navigation from "./Navigation/index";

import { StyledDevelopWrapper } from "./styles";

import Page from "./Page";
import FullScreenPreview from "../Preview/fullscreen";

import { TasksFactory } from "./Builder/Diagram/components/factories/TasksFactory";
import { AnchorFactory } from "./Builder/Diagram/components/factories/AnchorFactory";
import { CommentsFactory } from "./Builder/Diagram/components/factories/CommentsFactory";
import { DesignFactory } from "./Builder/Diagram/components/factories/DesignFactory";
import { InPortFactory } from "./Builder/Diagram/components/factories/InPortFactory";
import { OutPortFactory } from "./Builder/Diagram/components/factories/OutPortFactory";

import { AnchorModel } from "./Builder/Diagram/components/models/AnchorModel";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export default class Controller extends Component {
  state = {
    page: "participant",
    study: { ...this.props.study },
    isTaskSelectorOpen: false,
    isTaskBuilderOpen: false,
    needToClone: this.props.needToClone,
    adminMode: this.props.adminMode,
    newStudyFromScratch: this.props.newStudyFromScratch,
    showComponentPreview: false,
    showStudyPreview: false,
    modal: null,
    engine: null,
  };

  componentDidMount() {
    // setup diagram engine
    if (!this.state.engine) {
      const engine = createEngine();
      engine.setModel(new DiagramModel());
      // Create custom node
      engine.getNodeFactories().registerFactory(new TasksFactory());
      // Create custom comment
      engine.getNodeFactories().registerFactory(new CommentsFactory());
      // Create custom anchor
      engine.getNodeFactories().registerFactory(new AnchorFactory());
      // Create custom study design node
      engine.getNodeFactories().registerFactory(new DesignFactory());
      // Register ports
      engine.getPortFactories().registerFactory(new InPortFactory());
      engine.getPortFactories().registerFactory(new OutPortFactory());
      // disable creating new nodes when clicking on the link
      engine.maxNumberPointsPerLink = 0;
      // disable loose links
      const state = engine.getStateMachine().getCurrentState();
      if (state instanceof DefaultDiagramState) {
        state.dragNewLink.config.allowLooseLinks = false;
      }
      // load the saved model
      if (this.state?.study?.diagram) {
        const model = new DiagramModel();
        model.deserializeModel(JSON.parse(this.state?.study?.diagram), engine);
        engine.setModel(model);
      } else {
        const anchor = new AnchorModel({});
        engine.getModel().addNode(anchor);
      }
      this.setState({
        engine,
      });
    }
  }

  // to update the study state
  updateStudyState = (name, value) => {
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  // to update many values of the study state
  handleSetMultipleValuesInState = (values) => {
    this.setState({
      study: {
        ...this.state.study,
        ...values,
      },
    });
  };

  handleStudyChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  handleParameterChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    const currentInfo = [...this.state.study.info];
    if (currentInfo.filter((el) => el.name === name).length === 0) {
      currentInfo.push({ name });
    }
    const info = currentInfo.map((el) =>
      el.name === name ? { ...el, [className]: val } : el
    );
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  deleteParameter = (name) => {
    const info = this.state.study.info.filter((p) => p.name !== name);
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  handleSettingsChange = (e) => {
    const { name } = e.target;
    const settings = { ...this.state.study.settings };
    settings[name] = !this.state.study.settings[name];
    this.setState({
      study: {
        ...this.state.study,
        settings,
      },
    });
  };

  uploadImage = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "studies");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mindhive-science/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({
      study: {
        ...this.state.study,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      },
    });
  };

  updateComponents = (components) => {
    this.setState({
      study: {
        ...this.state.study,
        components,
      },
    });
  };

  addComponent = (component) => {
    let updatedBlocks;

    if (this.state.study?.components?.blocks) {
      updatedBlocks = [...this.state.study?.components?.blocks];
    } else {
      updatedBlocks = [];
    }

    if (updatedBlocks.length === 0) {
      updatedBlocks.push({
        blockId: uniqid.time(),
        title: "Main experiment sequence",
        tests: [],
      });
    }

    const newData = {
      ...component,
      testId: uniqid.time(),
    };

    updatedBlocks[0] = {
      ...updatedBlocks[0],
      tests: updatedBlocks[0].tests.concat({ ...newData }),
    };

    // update the state
    this.setState({
      study: {
        ...this.state.study,
        components: { blocks: updatedBlocks },
      },
    });
  };

  toggleComponentPreview = (component) => {
    this.setState({
      showComponentPreview: true,
      component,
    });
  };

  toggleStudyPreview = () => {
    this.setState({
      showStudyPreview: true,
    });
  };

  handlePageChange = (e, { name }) => this.setState({ page: name });

  toggleTaskSelector = (newState) => {
    this.setState({
      isTaskSelectorOpen: newState,
    });
  };

  openTaskBuilder = (componentId) => {
    this.setState({
      isTaskBuilderOpen: true,
      componentId,
    });
  };

  onTaskBuilderLeave = () => {
    this.setState({
      isTaskBuilderOpen: false,
      componentId: null,
    });
  };

  createNewStudy = async (createStudyMutation) => {
    const { components, diagram } = this.saveDiagramState();
    const res = await createStudyMutation({
      variables: {
        ...this.state.study,
        components,
        diagram,
      },
    });
    const myStudy = res.data.createStudy;
    this.setState({
      needToClone: false,
      newStudyFromScratch: false,
      study: {
        ...myStudy,
        consentId: myStudy.consent.map((consent) => consent.id),
        collaborators: (myStudy.collaborators &&
          myStudy.collaborators.map((c) => c.username).length &&
          myStudy.collaborators.map((c) => c.username)) || [""],
        classes: myStudy.classes.map((cl) => cl?.id),
      },
    });
  };

  updateMyStudy = async (updateStudyMutation) => {
    const { components, diagram } = this.saveDiagramState();
    await updateStudyMutation({
      variables: {
        ...this.state.study,
        components,
        diagram,
      },
    });
  };

  // diagram functions
  findChildren = (node) => {
    let children = [];
    if (
      node?.ports?.out?.links &&
      Object.values(node?.ports?.out?.links).length
    ) {
      children = Object.values(node?.ports?.out?.links).map(
        (link) => link?.targetPort?.parent
      );
    }
    return children;
  };

  makeBlock = (tests) => ({
    blockId: uniqid.time(),
    title: generate().dashed,
    tests: [...tests],
    skip: false,
  });

  findChildrenRecursively = (nodes, level, blocks, tests) => {
    nodes.forEach((node) => {
      let blockTests = [];
      if (level > 0) {
        blockTests = [...tests];
        blockTests.push({
          id: node?.options?.componentID,
          title: node?.options?.name,
          testId: node?.options?.testId,
          subtitle: node?.options?.subtitle,
          level,
        });
      }
      const children = this.findChildren(node) || [];
      if (children.length) {
        this.findChildrenRecursively(children, level + 1, blocks, blockTests);
      } else {
        blocks.push(this.makeBlock(blockTests));
      }
    });
  };

  createStudyDesign = ({ model }) => {
    const allNodes = model.getNodes() || [];
    const startingNode = allNodes.filter(
      (node) => node?.options?.type === "my-anchor"
    );
    const blocks = [];
    this.findChildrenRecursively(startingNode, 0, blocks, []);
    return { blocks };
  };

  saveDiagramState = () => {
    const model = this.state?.engine?.model;
    // Serializing
    const diagram = JSON.stringify(model.serialize());
    // Get the experiment model
    const components = this.createStudyDesign({ model });
    this.setState({
      study: {
        ...this.state.study,
        diagram,
        components,
      },
    });
    return {
      diagram,
      components,
    };
  };

  render() {
    const { user } = this.props;
    const { study, showStudyPreview, showComponentPreview } = this.state;

    const isAuthor =
      user.id === study?.author?.id ||
      study?.collaborators.includes(user.username);

    const [proposal] = study?.proposal || [];
    const proposalId = proposal ? proposal.id : undefined;

    if (showStudyPreview) {
      return (
        <FullScreenPreview
          previewOf="study"
          user={this.props?.user?.id || ""}
          study={study}
          handleFinish={() => this.setState({ showStudyPreview: false })}
        />
      );
    }

    if (showComponentPreview) {
      return (
        <FullScreenPreview
          previewOf="component"
          user={this.props?.user?.id || ""}
          parameters={this.state.component.parameters}
          template={this.state.component.template}
          handleFinish={() => this.setState({ showComponentPreview: false })}
        />
      );
    }

    return (
      <StyledDevelopWrapper>
        <Navigation
          {...this.state}
          user={this.props.user}
          onLeave={this.props.onLeave}
          createNewStudy={this.createNewStudy}
          updateMyStudy={this.updateMyStudy}
          handlePageChange={this.handlePageChange}
          proposalId={proposalId}
          isAuthor={isAuthor}
          updateStudyState={this.updateStudyState}
        />
        <Page
          {...this.state}
          proposals={this.props.study.proposal}
          descriptionInProposalCard={this.props.study.descriptionInProposalCard}
          user={this.props.user}
          handleStudyChange={this.handleStudyChange}
          handleParameterChange={this.handleParameterChange}
          handleSettingsChange={this.handleSettingsChange}
          updateStudyState={this.updateStudyState}
          onAddComponent={this.addComponent}
          toggleTaskSelector={this.toggleTaskSelector}
          openTaskBuilder={this.openTaskBuilder}
          handleSetMultipleValuesInState={this.handleSetMultipleValuesInState}
          uploadImage={this.uploadImage}
          deleteParameter={this.deleteParameter}
          updateComponents={this.updateComponents}
          toggleComponentPreview={this.toggleComponentPreview}
          toggleStudyPreview={this.toggleStudyPreview}
        />
      </StyledDevelopWrapper>
    );
  }
}
