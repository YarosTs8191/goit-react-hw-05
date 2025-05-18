import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return res.data.results;
};

export const fetchMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
};

export const fetchMovieCast = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return res.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return res.data.results;
};
