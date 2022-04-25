import React, { Component } from 'react';

import { Mutation } from '@apollo/client/react/components';
import Notebook from './notebook';

import Menu from './menu';
import SavedScripts from './savedScripts';

import { CREATE_SCRIPT, UPDATE_SCRIPT } from '../Mutations/Script';
import { MY_SCRIPTS } from '../Queries/Script';

import StyledStarboard, { ScriptStyledForm } from '../Styles/Script';

class NotebookWrapper extends Component {
  state = {
    isScripting: false,
    id: null,
    isSelectModalOpen: false,
    title: '',
    description: '',
    content: '',
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isNew: false,
    });
  };

  updateContent = ({ content }) => {
    this.setState({ content, isNew: false });
  };

  newScript = () => {
    this.setState({
      isSelectModalOpen: false,
      isScripting: true,
      content: '# %% [javascript]\n3+5\n',
      isNew: true,
      id: null,
      title: '',
      description: '',
    });
  };

  openScript = ({ script }) => {
    this.setState({
      isSelectModalOpen: false,
      isScripting: true,
      id: script?.id,
      content: script?.content,
      title: script?.title,
      description: script?.description,
      isNew: true,
    });
  };

  handleItemClick = (e, { name }) => {
    if (name === 'open') {
      this.setState({
        isSelectModalOpen: !this.state.isSelectModalOpen,
      });
    }
  };

  render() {
    const { study } = this.props;

    return (
      <StyledStarboard>
        <Menu handleItemClick={this.handleItemClick} />

        {this.state.isSelectModalOpen && (
          <SavedScripts
            openScript={this.openScript}
            newScript={this.newScript}
          />
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
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          value={this.state.title}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.saveToState}
                        />
                      </label>
                      <button
                        onClick={async e => {
                          e.preventDefault();
                          if (!this.state.title.trim()) {
                            return alert('Title is missing');
                          }
                          const res = await updateScript();
                        }}
                        disabled={loading}
                      >
                        Save
                      </button>
                    </fieldset>
                  )}
                </Mutation>
              ) : (
                <Mutation
                  mutation={CREATE_SCRIPT}
                  variables={this.state}
                  refetchQueries={[{ query: MY_SCRIPTS }]}
                >
                  {(createScript, { loading, error }) => (
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          value={this.state.title}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.saveToState}
                        />
                      </label>
                      <button
                        onClick={async e => {
                          e.preventDefault();
                          if (!this.state.title.trim()) {
                            return alert('Title is missing');
                          }
                          const res = await createScript();
                          this.setState({
                            id: res?.data?.createScript?.id,
                          });
                        }}
                        disabled={loading}
                      >
                        Save new script
                      </button>
                    </fieldset>
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
