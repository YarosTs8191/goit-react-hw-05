import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    async function getMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Could not load movie details.");
      }
    }

    getMovie();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <button className={css.goback} onClick={() => navigate(backLink)}>
        Go back
      </button>
      <h2 className={css.title}> {movie.title}</h2>
      <p className={css.text}> {movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width="250"
      />
      <h3>Additional Information</h3>
      <ul className={css.links}>
        <li>
          <Link className={css.link} to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link className={css.link} to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
