import React, { Component } from "react";
import Like from "./like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "",
      content: (m) => (
        <Like liked={m.liked} onLiked={() => this.props.onLiked(m)} />
      ),
    },
    {
      key: "delete",
      label: "",
      content: (m) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(m)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movieslist, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movieslist}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
