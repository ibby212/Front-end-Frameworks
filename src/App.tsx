import { useState } from "react";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

function App() {
  const [query, setQuery] = useState("");

  const filteredMovies = SAMPLE_MOVIES.filter((m) =>
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
