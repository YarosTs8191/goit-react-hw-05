import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("Failed to load reviews.");
      }
    }

    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div className={css.container}>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.author}</strong>:
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
