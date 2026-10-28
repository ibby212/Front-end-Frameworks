import { SAMPLE_MOVIES } from "./data/sampleMovies";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="app-layout">
      <SearchBar />
      <main className="main-container">
        <h1>Movie App</h1>
        <MovieList movies={SAMPLE_MOVIES} />
      </main>
    </div>
  );
}

export default App;
