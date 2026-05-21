import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdbClient';
import { TMDB_ENDPOINTS } from '../api/endpoints';
import { QUERY_KEYS } from '../constants/queryKeys';

export interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

export function useFetchGenres() {
  return useQuery({
    queryKey: QUERY_KEYS.genres.all(),
    queryFn: async () => {
      const { data } = await tmdbClient.get<GenresResponse>(TMDB_ENDPOINTS.genreList);
      return data.genres;
    },
    staleTime: 1000 * 60 * 60,
  });
}
