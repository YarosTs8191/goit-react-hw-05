import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError("Failed to load cast.");
      }
    }

    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h4>Cast</h4>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                width="80"
              />
            )}
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
