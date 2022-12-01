import React, { Component } from 'react';
import Navigation from './Navigation/index';

import { StyledDevelopWrapper } from './styles';

import Page from './Page';
import FullScreenPreview from '../Preview/fullscreen';

export default class Controller extends Component {
  state = {
    page: 'participant',
    study: { ...this.props.study },
    isTaskSelectorOpen: false,
    isTaskBuilderOpen: false,
    needToClone: this.props.needToClone,
    adminMode: this.props.adminMode,
    newStudyFromScratch: this.props.newStudyFromScratch,
    showComponentPreview: false,
    showStudyPreview: false,
    modal: null,
  };

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
  handleSetMultipleValuesInState = values => {
    this.setState({
      study: {
        ...this.state.study,
        ...values,
      },
    });
  };

  handleStudyChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  handleParameterChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    const currentInfo = [...this.state.study.info];
    if (currentInfo.filter(el => el.name === name).length === 0) {
      currentInfo.push({ name });
    }
    const info = currentInfo.map(el =>
      el.name === name ? { ...el, [className]: val } : el
    );
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  deleteParameter = name => {
    const info = this.state.study.info.filter(p => p.name !== name);
    this.setState({
      study: {
        ...this.state.study,
        info,
      },
    });
  };

  handleSettingsChange = e => {
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

  uploadImage = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'studies');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive-science/image/upload',
      { method: 'POST', body: data }
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

  updateComponents = components => {
    this.setState({
      study: {
        ...this.state.study,
        components,
      },
    });
  };

  addComponent = component => {
    let updatedBlocks;

    if (this.state.study?.components?.blocks) {
      updatedBlocks = [...this.state.study?.components?.blocks];
    } else {
      updatedBlocks = [];
    }

    if (updatedBlocks.length === 0) {
      updatedBlocks.push({
        blockId: uniqid.time(),
        title: 'Main experiment sequence',
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

  toggleComponentPreview = component => {
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

  toggleTaskSelector = newState => {
    this.setState({
      isTaskSelectorOpen: newState,
    });
  };

  openTaskBuilder = componentId => {
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

  createNewStudy = async createStudyMutation => {
    const res = await createStudyMutation({
      variables: {
        ...this.state.study,
      },
    });
    const myStudy = res.data.createStudy;
    this.setState({
      needToClone: false,
      newStudyFromScratch: false,
      study: {
        ...myStudy,
        consentId: myStudy.consent.map(consent => consent.id),
        collaborators: (myStudy.collaborators &&
          myStudy.collaborators.map(c => c.username).length &&
          myStudy.collaborators.map(c => c.username)) || [''],
        classes: myStudy.classes.map(cl => cl?.id),
      },
    });
  };

  updateMyStudy = async updateStudyMutation => {
    const res = await updateStudyMutation({
      variables: {
        ...this.state.study,
      },
    });
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
          user={this.props?.user?.id || ''}
          study={study}
          handleFinish={() => this.setState({ showStudyPreview: false })}
        />
      );
    }

    if (showComponentPreview) {
      return (
        <FullScreenPreview
          previewOf="component"
          user={this.props?.user?.id || ''}
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
