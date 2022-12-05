import React, { Component } from 'react';
import { StyledPageButtons, StyledPageHeader } from '../../styles';
import SurveyPageBuilder from './surveyPageBuilder';

class SurveyBuilder extends Component {
  // it holds all pages and displays the currently active page on the screen with surveyPageBuilder
  state = {
    pages: JSON.parse(this.props.content) || [],
    currentPage: 0,
  };

  packThePages = value => ({
    target: {
      name: this.props.name,
      type: 'survey',
      value: JSON.stringify(value),
    },
  });

  updateProps = pages => {
    const packed = this.packThePages(pages);
    this.props.onChange(packed);
  };

  updatePages = ({ page, timeout }) => {
    const updatedPages = this.state.pages;
    updatedPages[this.state.currentPage] = { page, timeout };
    this.updateProps(updatedPages);
  };

  moveToPage = (e, number) => {
    e.preventDefault();
    this.setState({
      currentPage: number,
      activePage: this.state.pages[number],
    });
  };

  addNewPage = e => {
    e.preventDefault();
    const updatedPages = this.state.pages;
    updatedPages.push({ page: [] });
    this.updateProps(updatedPages);
  };

  deletePage = (e, number) => {
    e.preventDefault();
    const nextPage = number > 0 ? number - 1 : number;
    this.setState({
      currentPage: nextPage,
    });
    const { pages } = this.state;
    pages.splice(number, 1);
    this.updateProps(pages);
  };

  render() {
    return (
      <>
        <StyledPageHeader>
          {this.state.pages && this.state.pages.length > 0 ? (
            <h2>Page {this.state.currentPage + 1}</h2>
          ) : (
            <h2>Add your first page</h2>
          )}

          <button
            className="notActivePageButton"
            onClick={e => this.deletePage(e, this.state.currentPage)}
          >
            Delete this page
          </button>
        </StyledPageHeader>

        <StyledPageButtons>
          {this.state.pages.map((page, number) => (
            <button
              onClick={e => this.moveToPage(e, number)}
              key={number}
              className={
                number === this.state.currentPage
                  ? 'activePageButton'
                  : 'notActivePageButton'
              }
            >
              {number + 1}
            </button>
          ))}
          {this.state.pages && (
            <button
              className="notActivePageButton"
              onClick={e => this.addNewPage(e)}
            >
              +
            </button>
          )}
        </StyledPageButtons>

        {this.state.pages && this.state.pages.length > 0 && (
          <SurveyPageBuilder
            name={this.props.name}
            items={this.state.pages[this.state.currentPage]?.page || {}}
            timeout={this.state.pages[this.state.currentPage]?.timeout || {}}
            onChange={this.updatePages}
          />
        )}
      </>
    );
  }
}

export default SurveyBuilder;
