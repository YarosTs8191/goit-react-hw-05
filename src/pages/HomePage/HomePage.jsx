import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to fetch trending movies.");
      }
    };
    loadTrending();
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
