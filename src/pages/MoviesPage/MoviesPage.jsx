import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        const results = await searchMovies(query);

        if (results.length === 0) {
          toast.error(`No results found for "${query}"`);
        }

        setMovies(results);
        setError(null);
      } catch (err) {
        setError("Search failed. Try again.");
        toast.error("Search failed. Try again.");
      }
    }

    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value === "") return;
    setSearchParams({ query: value });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
      <Toaster position="top-right" />
    </main>
  );
};

export default MoviesPage;
