import React, { Component } from 'react';
import slugify from 'slugify';
import uniqid from 'uniqid';

import TaskBuilderWrapper from '../Component/builderWrapper';

import Navigation from './navigation';
import StudyBuilderSection from './StudyBuilder/index';
import DownloadSection from './Download/index';
import AnalyzeSection from './Analyze/index';
import ProposalSection from './Proposal/index';
import ReviewSection from './Review/index';
import CollectSection from './Collect/index';
import InDev from './inDev';

import SharingModal from './Sharing/modal';

import FullScreenPreview from '../../Preview/fullscreen';

import {
  StyledBuilder,
  StyledEditPane,
  StyledPreviewPane,
  StyledBuilderPage,
} from '../styles';

const makeSlug = title => {
  const slug = slugify(title, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
  return slug;
};

class StudyBuilder extends Component {
  state = {
    page: 'builder',
    study: { ...this.props.study },
    isTaskSelectorOpen: false,
    isTaskBuilderOpen: false,
    needToClone: this.props.needToClone,
    adminMode: this.props.adminMode,
    newStudyFromScratch: this.props.newStudyFromScratch,
    section: 'studyBuilder',
    showComponentPreview: false,
    showStudyPreview: false,
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

  handleSectionChange = (e, { name }) => this.setState({ section: name });

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

  handleSetState = (name, value) => {
    this.setState({
      study: {
        ...this.state.study,
        [name]: value,
      },
    });
  };

  handleSetMultipleValuesInState = values => {
    this.setState({
      study: {
        ...this.state.study,
        ...values,
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
    const value = e.target.checked;
    const settings = { ...this.state.study.settings };
    settings[name] = value;
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

  toggleTaskSelector = newState => {
    this.setState({
      isTaskSelectorOpen: newState,
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

  openTaskEditor = componentId => {
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

  openSharingModal = () => {
    this.setState({
      page: 'sharing',
    });
  };

  onModalClose = () => {
    this.setState({
      page: 'builder',
    });
  };

  render() {
    const { user } = this.props;
    const { study, needToClone, adminMode, newStudyFromScratch } = this.state;

    const isAuthor =
      user.id === study?.author?.id ||
      study?.collaborators.includes(user.username);

    const [proposal] = study?.proposal || [];
    const proposalId = proposal ? proposal.id : undefined;

    if (this.state.showStudyPreview) {
      return (
        <FullScreenPreview
          previewOf="study"
          user={this.props?.user?.id || ''}
          study={study}
          handleFinish={() => this.setState({ showStudyPreview: false })}
        />
      );
    }

    if (this.state.showComponentPreview) {
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
      <>
        {this.state.isTaskBuilderOpen ? (
          <TaskBuilderWrapper
            onLeave={this.onTaskBuilderLeave}
            componentId={this.state.componentId}
            user={this.props.user}
          />
        ) : (
          <StyledBuilderPage>
            <Navigation
              onLeave={this.props.onLeave}
              study={this.state.study}
              user={this.props.user}
              isAuthor={isAuthor}
              adminMode={adminMode}
              needToClone={needToClone}
              newStudyFromScratch={newStudyFromScratch}
              proposalId={proposalId}
              createNewStudy={this.createNewStudy}
              updateMyStudy={this.updateMyStudy}
              handleSectionChange={this.handleSectionChange}
              section={this.state.section}
              openSharingModal={this.openSharingModal}
            />

            {this.state.section === 'proposal' && (
              <ProposalSection
                study={this.props.study}
                user={this.props.user}
                adminMode={this.props.adminMode}
              />
            )}

            {this.state.section === 'studyBuilder' && (
              <StudyBuilderSection
                isTaskSelectorOpen={this.state.isTaskSelectorOpen}
                handleStudyChange={this.handleStudyChange}
                handleParameterChange={this.handleParameterChange}
                handleSettingsChange={this.handleSettingsChange}
                handleSetState={this.handleSetState}
                study={this.state.study}
                user={this.props.user}
                needToClone={needToClone}
                onAddComponent={this.addComponent}
                toggleTaskSelector={this.toggleTaskSelector}
                openTaskEditor={this.openTaskEditor}
                handleSetMultipleValuesInState={
                  this.handleSetMultipleValuesInState
                }
                uploadImage={this.uploadImage}
                deleteParameter={this.deleteParameter}
                updateComponents={this.updateComponents}
                toggleComponentPreview={this.toggleComponentPreview}
                toggleStudyPreview={this.toggleStudyPreview}
              />
            )}
            {this.state.section === 'review' && (
              <ReviewSection study={this.props.study} user={this.props.user} />
            )}

            {this.state.section === 'collect' && (
              <CollectSection study={this.state.study} user={this.props.user} />
            )}

            {this.state.section === 'download' && (
              <DownloadSection studyId={this.state.study.id} />
            )}

            {this.state.section === 'analyze' && (
              <AnalyzeSection study={this.state.study} user={this.props.user} />
            )}
          </StyledBuilderPage>
        )}
        {this.state.page === 'sharing' && (
          <SharingModal
            study={this.state.study}
            isAuthor={isAuthor}
            adminMode={adminMode}
            needToClone={needToClone}
            newStudyFromScratch={newStudyFromScratch}
            proposalId={proposalId}
            createNewStudy={this.createNewStudy}
            updateMyStudy={this.updateMyStudy}
            onModalClose={this.onModalClose}
            handleSetState={this.handleSetState}
            user={this.props.user}
          />
        )}
      </>
    );
  }
}

export default StudyBuilder;
