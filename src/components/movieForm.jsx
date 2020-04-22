import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi";
import Form from "./common/form";

class movieForm extends Form {
  state = {
    data: { name: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(5).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>

        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number In Stock")}
        {this.renderInput("dailyRentalRate", "Daily Rental Rate")}

        {this.renderButton("Save")}
      </React.Fragment>
    );
  }
}

export default movieForm;
