import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { useMovies } from "./hooks/useMovies";

const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1`;

function App() {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(apiUrl);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-layout">
      <SearchBar query={query} onChange={setQuery} />
      <main className="main-container">
        <h1>Movie App</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong.</p>}
        {!loading && !error && <MovieList movies={filteredMovies} />}
      </main>
    </div>
  );
}

export default App;
