import React, { Component } from 'react';

import { StyledEditor } from './styles';

import Navigation from './navigation';
import EditPane from './editPane';

class ComponentEditor extends Component {
  state = {
    task: { ...this.props.task },
  };

  handleComponentChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    });
  };

  handleParamChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.map(el =>
          el.name === name ? { ...el, value: val } : el
        ),
      },
    });
  };

  handleTemplateParamChange = (e, classType) => {
    const { name, type, value, className } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (classType === 'array') {
      val = JSON.stringify(val.split('\n'));
    }
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.map(el =>
          el.name === name ? { ...el, [className]: val } : el
        ),
      },
    });
  };

  deleteTemplateParameter = (e, name) => {
    e.preventDefault();
    this.setState({
      task: {
        ...this.state.task,
        parameters: this.state.task.parameters.filter(el => el.name !== name),
      },
    });
  };

  handleSettingsChange = e => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    const settings = { ...this.state.task.settings };
    settings[name] = value;
    this.setState({
      task: {
        ...this.state.task,
        settings,
      },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      task: {
        ...this.state.task,
        [name]: value,
      },
    });
  };

  handleSetMultipleValuesInState = values => {
    this.setState({
      task: {
        ...this.state.task,
        ...values,
      },
    });
  };

  handleCollaboratorsChange = e => {
    const { name, value } = e.target;
    const collaborators = [...this.state.task.collaborators];
    collaborators[name] = value;
    if (name == collaborators.length - 1) {
      collaborators.push('');
    }
    this.setState({
      task: {
        ...this.state.task,
        collaborators,
      },
    });
  };

  createNewComponent = async (createComponentMutation, name) => {
    if (
      name === 'createTaskWithTemplate' &&
      !this.state.task?.template?.script
    ) {
      alert('Please upload a lab.js script');
      return;
    }
    const res = await createComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
    const myTask = res.data[name];
    this.setState({
      task: {
        ...myTask,
        consent: myTask?.consent?.id,
        collaborators: (myTask?.collaborators &&
          myTask.collaborators.map(c => c.username).length &&
          myTask.collaborators.map(c => c.username)) || [''],
      },
    });
    this.props.updateCanvas(myTask);
  };

  updateMyComponent = async (updateComponentMutation, name) => {
    const res = await updateComponentMutation({
      variables: {
        ...this.state.task,
      },
    });
    const myTask = res.data[name];
    this.setState({
      task: {
        ...this.state.task,
        template: {
          ...this.state.task.template,
          ...myTask.template,
        },
      },
    });
    this.props.updateCanvas(myTask);
  };

  // handle lab.js JSON file script upload
  // put the template in the state
  handleScriptUpload = async e => {
    const fileReader = new FileReader();
    const fileName =
      e.target.files[0].name && e.target.files[0].name.split('.')[0];
    fileReader.onload = async fileLoadedEvent => {
      const file = JSON.parse(fileLoadedEvent.target.result);
      const result = await assemble(file, fileName);
      const script = result.files['script.js'].content;
      const compressedString = lz.encodeBase64(lz.compress(script));
      // extract parameters from the task
      this.setState({
        task: {
          ...this.state.task,
          template: {
            ...this.state.task?.template,
            script: compressedString,
            style: result.files['style.css'].content,
          },
          parameters: [
            // {
            //   name: 'instruction',
            //   type: 'textarea',
            //   value:
            //     'When asked how you feel, move the slider to the right when you feel happy and to the left when you feel unhappy.',
            //   help:
            //     'These are the instructions for how to answer the question that participants will be asked in-between the trials. The text should correspond to the question content. Make sure the instructions are written in a way that is easy to understand and that leaves no ambiguity.',
            //   example:
            //     'The original study asked about participants’ happiness. The corresponding instructions talk explain how participants should answer the question when they feel happy versus unhappy.',
            // },
            ...result.files.parameters,
          ],
        },
      });
    };
    fileReader.readAsText(e.target.files[0]);
  };

  // remove the template from the state
  deleteTemplateLocally = () => {
    this.setState({
      task: {
        ...this.state.task,
        template: {
          ...this.state.task?.template,
          script: null,
          style: null,
        },
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
      task: {
        ...this.state.task,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      },
    });
  };

  render() {
    return (
      <StyledEditor>
        <Navigation
          testId={this.props.testId}
          task={this.state.task}
          isAuthor={this.props.isAuthor}
          closeModal={this.props.closeModal}
          onShowPreview={this.props.onShowPreview}
          createNewComponent={this.createNewComponent}
          updateMyComponent={this.updateMyComponent}
        />

        <EditPane
          handleTaskChange={this.handleComponentChange}
          handleParameterChange={this.handleParamChange}
          handleTemplateParamChange={this.handleTemplateParamChange}
          deleteTemplateParameter={this.deleteTemplateParameter}
          handleSettingsChange={this.handleSettingsChange}
          handleCollaboratorsChange={this.handleCollaboratorsChange}
          handleSetState={this.handleSetState}
          task={this.state.task}
          handleSetMultipleValuesInState={this.handleSetMultipleValuesInState}
          user={this.props.user}
          templateEditor={this.props.templateEditor}
          handleScriptUpload={this.handleScriptUpload}
          deleteTemplateLocally={this.deleteTemplateLocally}
          uploadImage={this.uploadImage}
        />
      </StyledEditor>
    );
  }
}

export default ComponentEditor;
