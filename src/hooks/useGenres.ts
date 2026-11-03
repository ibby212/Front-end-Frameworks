import { useEffect, useState } from "react";
import type { Genre } from "../types";

export function useGenres(url: string) {
  const [genres, setGenres] = useState<Genre[]>([]);
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

    async function fetchGenres() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchGenres();

    return () => controller.abort();
  }, [url]);

  return { genres, loading, error };
}
