import { useEffect, useState } from "react";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import type { Movie } from "./types";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>(SAMPLE_MOVIES);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options,
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.results))
      .catch((err) => console.error(err));
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-layout">
      <SearchBar query={query} onChange={setQuery} />
      <main className="main-container">
        <h1>Movie App</h1>
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
}

export default App;
