import React from "react";

const movieForm = ({ match, history }) => {
  return (
    <React.Fragment>
      <h1>Movie Form {match.params.id}</h1>

      <button
        type="button"
        class="btn btn-success"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default movieForm;
