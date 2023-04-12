import React, { Component } from "react";
import { StyledPagination } from "./styles";

class PaginationStudyParticipants extends Component {
  render() {
    const { perPage, page, count } = this.props;
    const pageCount = Math.ceil(count / perPage);
    return (
      <StyledPagination>
        <div
          onClick={() => {
            if (page > 1) this.props.changeToPage("page", page - 1);
          }}
        >
          <a
            aria-disabled={page <= 1}
            className={page <= 1 ? "inactive" : undefined}
          >
            Prev
          </a>
        </div>
        <p>
          Page {page} of {pageCount}{" "}
        </p>
        <p>{count} participants total</p>
        <div
          onClick={() => {
            if (page < pageCount) this.props.changeToPage("page", page + 1);
          }}
        >
          <a
            aria-disabled={page >= pageCount}
            className={page >= pageCount ? "next inactive" : "next"}
          >
            Next
          </a>
        </div>
      </StyledPagination>
    );
  }
}

export default PaginationStudyParticipants;
