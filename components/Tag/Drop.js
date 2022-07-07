import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class Drop extends Component {
  render() {
    const { tags, study } = this.props;
    const values = study?.tags || [];
    return (
      <div>
        <DropdownExampleMultipleSelection
          tags={tags}
          values={values}
          handleTagsUpdate={this.props.handleTagsUpdate}
        />
      </div>
    );
  }
}

const DropdownExampleMultipleSelection = ({
  tags,
  values,
  handleTagsUpdate,
}) => {
  const onChange = (event, data) => {
    handleTagsUpdate(data.value);
  };

  return (
    <Dropdown
      placeholder="Search for tags"
      fluid
      multiple
      search
      selection
      options={tags}
      onChange={onChange}
      value={values}
    />
  );
};
