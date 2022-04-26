import React, { Component } from 'react';

import { Mutation } from '@apollo/client/react/components';
import Notebook from './notebook';

import Menu from './menu';
import SavedScripts from './savedScripts';
import Templates from './templateScripts';

import ScriptForm from './scriptForm';

import { CREATE_SCRIPT, UPDATE_SCRIPT } from '../Mutations/Script';
import { MY_SCRIPTS } from '../Queries/Script';

import StyledStarboard, { ScriptStyledForm } from '../Styles/Script';

class NotebookWrapper extends Component {
  state = {
    isScripting: false,
    id: null,
    isSelectModalOpen: false,
    isTemplatesModalOpen: false,
    title: '',
    description: '',
    content: '',
    isTemplate: false,
    isPublic: false,
    isFeatured: false,
  };

  saveToState = e => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
      isNew: false,
    });
  };

  updateContent = ({ content }) => {
    this.setState({ content, isNew: false });
  };

  createNewScript = () => {
    this.setState({
      isSelectModalOpen: false,
      isScripting: true,
      content: '# %% [javascript]\n3+5\n',
      isNew: true,
      id: null,
      title: '',
      description: '',
      isTemplate: false,
      isPublic: false,
      isFeatured: false,
    });
  };

  openScript = ({ script }) => {
    this.setState({
      isSelectModalOpen: false,
      isTemplatesModalOpen: false,
      isScripting: true,
      id: script?.id,
      content: script?.content,
      title: script?.title,
      description: script?.description,
      isNew: true,
      isTemplate: script?.isTemplate,
      isPublic: script?.isPublic,
      isFeatured: script?.isFeatured,
    });
  };

  openTemplate = ({ script }) => {
    this.setState({
      isSelectModalOpen: false,
      isTemplatesModalOpen: false,
      isScripting: true,
      content: script?.content,
      title: script?.title,
      description: script?.description,
      isNew: true,
      isTemplate: false,
      isPublic: false,
      isFeatured: false,
    });
  };

  handleItemClick = (e, { name }) => {
    if (name === 'myScripts') {
      this.setState({
        isSelectModalOpen: !this.state.isSelectModalOpen,
        isTemplatesModalOpen: false,
      });
    }
    if (name === 'templates') {
      this.setState({
        isTemplatesModalOpen: !this.state.isTemplatesModalOpen,
        isSelectModalOpen: false,
      });
    }
  };

  render() {
    const { study, user } = this.props;

    return (
      <StyledStarboard>
        <Menu handleItemClick={this.handleItemClick} />

        {this.state.isSelectModalOpen && (
          <SavedScripts
            openScript={this.openScript}
            createNewScript={this.createNewScript}
            user={user}
          />
        )}

        {this.state.isTemplatesModalOpen && (
          <Templates openTemplate={this.openTemplate} user={user} />
        )}

        <div className="upperPart">
          {this.state.isScripting && (
            <ScriptStyledForm>
              {this.state.id ? (
                <Mutation
                  mutation={UPDATE_SCRIPT}
                  variables={this.state}
                  refetchQueries={[{ query: MY_SCRIPTS }]}
                >
                  {(updateScript, { loading, error }) => (
                    <ScriptForm
                      loading={loading}
                      title={this.state.title}
                      description={this.state.description}
                      isPublic={this.state.isPublic}
                      isTemplate={this.state.isTemplate}
                      isFeatured={this.state.isFeatured}
                      saveToState={this.saveToState}
                      onSaveClick={async e => {
                        e.preventDefault();
                        if (!this.state.title.trim()) {
                          return alert('The script title is missing');
                        }
                        await updateScript();
                      }}
                      buttonName="Save"
                      user={user}
                    />
                  )}
                </Mutation>
              ) : (
                <Mutation
                  mutation={CREATE_SCRIPT}
                  variables={this.state}
                  refetchQueries={[{ query: MY_SCRIPTS }]}
                >
                  {(createScript, { loading, error }) => (
                    <ScriptForm
                      loading={loading}
                      title={this.state.title}
                      description={this.state.description}
                      isPublic={this.state.isPublic}
                      isTemplate={this.state.isTemplate}
                      isFeatured={this.state.isFeatured}
                      saveToState={this.saveToState}
                      onSaveClick={async e => {
                        e.preventDefault();
                        if (!this.state.title.trim()) {
                          return alert('The script title is missing');
                        }
                        const res = await createScript();
                        this.setState({
                          id: res?.data?.createScript?.id,
                        });
                      }}
                      buttonName="Save new script"
                      user={user}
                    />
                  )}
                </Mutation>
              )}
            </ScriptStyledForm>
          )}

          {this.state.isScripting && (
            <Notebook
              isNew={this.state.isNew}
              content={this.state.content}
              updateContent={this.updateContent}
            />
          )}
        </div>
      </StyledStarboard>
    );
  }
}

export default NotebookWrapper;
