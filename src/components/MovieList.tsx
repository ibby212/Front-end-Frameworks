import type { Genre, Movie } from "../types";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  genres?: Genre[];
};

const MovieList = ({ movies, genres }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-text">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
};

export default MovieList;
