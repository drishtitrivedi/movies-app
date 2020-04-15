import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Paginate from "./utils/paginate";
import PropTypes from "prop-types";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movieslist = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movieslist };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (movies.length === 0) {
      return <p> There are no Movies </p>;
    }

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? movies.filter((m) => m.genre._id === selectedGenre._id)
    //     : movies;

    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // const movieslist = Paginate(sorted, currentPage, pageSize);
    const { totalCount, data: movieslist } = this.getPageData();

    return (
      <React.Fragment>
        <h2>Movies</h2>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedGenre={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-9">
            <h4> Showing {totalCount} movies </h4>
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            <MoviesTable
              movieslist={movieslist}
              sortColumn={sortColumn}
              onLiked={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Movies;
