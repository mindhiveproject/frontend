import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ExperimentPreview from '../../../Task/Preview/index';

const StyledComponentPane = styled.div`
  display: grid;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props => (props.type === 'Task' ? '#64c9e2' : '#28619e')};
  padding: 16px;
  margin-bottom: 10px;
  .cardHeader {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: end;
    button {
      width: 35px;
      height: 35px;
      text-align: center;
      border-radius: 20px;
    }
  }
  .cardButtons {
    display: grid;
    align-items: center;
    justify-items: start;
    grid-template-columns: 150px auto;
    grid-gap: 10px;
    button {
      color: #007c70;
      background: white;
      border: 2px #007c70 solid;
    }
    a {
      cursor: pointer;
      text-decoration-line: underline;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-align: center;
    }
  }
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const COMPONENT_QUERY = gql`
  query COMPONENT_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      slug
      description
      parameters
      settings
      updatedAt
      link
      template {
        id
        title
        description
        parameters
        script
        style
      }
      taskType
    }
  }
`;

class ComponentPane extends Component {
  state = {
    showPreview: false,
  };

  removeFromStudy = (component, number) => {
    this.props.onRemoveComponent(component, number);
  };

  togglePreview = e => {
    e.target.blur();
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  render() {
    const { component, number, viewing } = this.props;

    return (
      <Query
        query={COMPONENT_QUERY}
        variables={{ id: this.props.component.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.id}</p>;
          const component = data.task;
          console.log('component', component);
          return (
            <>
              <StyledComponentPane type={component.type}>
                <div className="cardInfo">
                  <div className="cardHeader">
                    <div>
                      <h2>{component.title}</h2>
                    </div>
                    <div>
                      <button
                        onClick={() => this.removeFromStudy(component, number)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                  {viewing === 'before' && (
                    <p>{component?.settings?.descriptionBefore}</p>
                  )}
                  {viewing === 'after' && (
                    <p>{component?.settings?.descriptionAfter}</p>
                  )}

                  <div className="cardButtons">
                    <button
                      onClick={() => this.props.openTaskEditor(component.id)}
                    >
                      Open Editor
                    </button>
                    <a onClick={this.togglePreview}>
                      <p>Preview</p>
                    </a>
                  </div>
                </div>
              </StyledComponentPane>
              {this.state.showPreview && (
                <ExperimentPreview
                  user={this.props?.user?.id || ''}
                  parameters={component.parameters}
                  template={component.template}
                  handleFinish={() => this.setState({ showPreview: false })}
                />
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default ComponentPane;
export { COMPONENT_QUERY };
