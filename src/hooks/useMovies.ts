import { useEffect, useState } from "react";
import type { Movie } from "../types";

export function useMovies(url: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      signal: controller.signal,
    };

    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [url]);

  return { movies, loading, error };
}
