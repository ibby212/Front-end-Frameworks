import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useGenres } from "../hooks/useGenres";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import type { Movie } from "../types";

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;
const genresUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/genre/movie/list?language=en`;

const HomePage = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const { movies, loading, error } = useMovies(apiUrl);
  const { genres } = useGenres(genresUrl);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="main-container">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong. {error}</p>}
      {!loading && !error && (
        <MovieList
          movies={filteredMovies}
          genres={genres}
          onMovieClick={setSelectedMovie}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          genres={genres}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
};

export default HomePage;
