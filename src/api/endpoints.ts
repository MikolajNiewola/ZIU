export const TMDB_ENDPOINTS = {
  moviePopular: '/movie/popular',
  movieSearch: '/search/movie',
  movieDetail: (id: number) => `/movie/${id}` as const,
  genreList: '/genre/movie/list',
  discoverMovie: '/discover/movie',
} as const;

export const RAM_BASE = 'https://rickandmortyapi.com/api';
