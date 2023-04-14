import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

const fetchMovies = async (page = 1) => {
  const res = await fetch(`${API_URL}&page=${page}`);
  const data = await res.json();

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    overview: movie.overview,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average
  }));
};


const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchMovies(currentPage)
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  return (
    <div>
      <h1><i>CineWorld</i></h1>
      <div className="movies">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.releaseDate}
            posterPath={`https://image.tmdb.org/t/p/w185/${movie.posterPath}`}
            voteAverage={movie.voteAverage}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button className="pagination-button" onClick={handleNextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
