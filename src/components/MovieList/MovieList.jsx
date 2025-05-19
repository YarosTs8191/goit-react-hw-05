import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
                className={css.poster}
              />
            )}
            <p className={css.title}>{movie.title || movie.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
