import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { totalCount, currentPage, pageSize, onPageChange } = props;
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pages.length === 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
