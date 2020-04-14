import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  reiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movieslist, onLiked, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th
              onClick={() => this.reiseSort("title")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Title <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.reiseSort("genre.name")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Genre <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.reiseSort("numberInStock")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              In Stock <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th
              onClick={() => this.reiseSort("dailyRentalRate")}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              Rental Rate <i className="fa fa-sort" aria-hidden="true"></i>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movieslist.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <Like liked={m.liked} onLiked={() => onLiked(m)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(m)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
