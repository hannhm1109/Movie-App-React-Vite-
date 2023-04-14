import React from "react";
import "./Movie.css";

const Movie = ({ title, overview, releaseDate, posterPath, voteAverage }) => {
  return (
    <div className="movie">
      <img className="movie-poster" src={posterPath} alt={`${title} poster`} />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <span className="movie-release-date">{releaseDate}</span>
        <p className="movie-overview">{overview}</p>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
    </div>
  );
};

export default Movie;
