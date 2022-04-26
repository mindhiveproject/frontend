import React, { Component } from 'react';

class ScriptForm extends Component {
  render() {
    const {
      loading,
      title,
      description,
      isPublic,
      isTemplate,
      isFeatured,
      saveToState,
      onSaveClick,
      buttonName,
      user,
    } = this.props;
    return (
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={saveToState}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={saveToState}
          />
        </label>

        {user?.permissions?.includes('ADMIN') && (
          <div>
            <label htmlFor="isPublic">
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={isPublic}
                  onChange={saveToState}
                />
                <p>Public</p>
              </div>
            </label>

            <label htmlFor="isTemplate">
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="isTemplate"
                  name="isTemplate"
                  checked={isTemplate}
                  onChange={saveToState}
                />
                <p>Template</p>
              </div>
            </label>

            <label htmlFor="isFeatured">
              <div className="checkboxField">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={isFeatured}
                  onChange={saveToState}
                />
                <p>Featured</p>
              </div>
            </label>
          </div>
        )}

        <button onClick={onSaveClick} disabled={loading}>
          {buttonName}
        </button>
      </fieldset>
    );
  }
}

export default ScriptForm;
