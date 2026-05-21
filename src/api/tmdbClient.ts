import axios from 'axios';

const TMDB_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    ...(import.meta.env.VITE_TMDB_API_KEY
      ? { api_key: import.meta.env.VITE_TMDB_API_KEY }
      : {}),
    language: 'pl-PL',
  },
});