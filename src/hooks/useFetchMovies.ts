import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdbClient';
import { TMDB_ENDPOINTS } from '../api/endpoints';
import { QUERY_KEYS } from '../constants/queryKeys';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export function useFetchMovies(page = 1, query = '', genreId: number | null = null) {
  const isSearch = query.trim().length > 0;
  const isGenreFilter = !isSearch && genreId !== null;

  return useQuery({
    queryKey: isSearch
      ? QUERY_KEYS.movies.search(query, page)
      : isGenreFilter
        ? QUERY_KEYS.movies.genre(genreId!, page)
        : QUERY_KEYS.movies.popular(page),
    queryFn: async () => {
      let endpoint: string = TMDB_ENDPOINTS.moviePopular;
      const params: Record<string, string | number> = { page };

      if (isSearch) {
        endpoint = TMDB_ENDPOINTS.movieSearch;
        params.query = query;
      } else if (isGenreFilter) {
        endpoint = TMDB_ENDPOINTS.discoverMovie;
        params.with_genres = genreId!;
      }

      const { data } = await tmdbClient.get<MoviesResponse>(endpoint, { params });
      return data;
    },
    enabled: !isSearch || query.trim().length >= 2, // min 2 znaki dla wyszukiwania
    placeholderData: (prev) => prev,  // płynna paginacja bez migotania
    staleTime: 1000 * 60 * 3,         // 3 minuty
  });
}