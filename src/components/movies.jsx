import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Paginate from "./utils/paginate";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
      searchQuery,
    } = this.state;

    let filtered = movies;

    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
    }

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
      searchQuery,
    } = this.state;
    if (movies.length === 0) {
      return <p> There are no Movies </p>;
    }

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
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>

            <h4> Showing {totalCount} movies </h4>
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
