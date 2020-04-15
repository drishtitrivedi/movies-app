import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((c) => (
            <th
              key={c.path || c.key}
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort(c.path)}
            >
              {c.label} {this.renderSortIcon(c)}
              {/* <i className="fa fa-sort" aria-hidden="true"></i> */}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
