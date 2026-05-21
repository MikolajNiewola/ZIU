import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdbClient';
import { TMDB_ENDPOINTS } from '../api/endpoints';
import { QUERY_KEYS } from '../constants/queryKeys';

export interface MovieDetails {
  id: number;
  title: string;
  tagline?: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime?: number;
  vote_average: number;
  vote_count: number;
  genres?: { id: number; name: string }[];
  budget: number;
  revenue: number;
}

export function useMovieDetails(id: number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.movies.detail(id ?? 0),
    queryFn: async () => {
      const { data } = await tmdbClient.get<MovieDetails>(TMDB_ENDPOINTS.movieDetail(id!));
      return data;
    },
    enabled: id !== null,  // pobiera TYLKO gdy modal otwarty
  });
}
