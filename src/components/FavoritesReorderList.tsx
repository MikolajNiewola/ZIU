import { Reorder } from 'framer-motion';
import type { Movie } from '../hooks/useFetchMovies';
import { MovieCard } from './MovieCard';

interface Props {
  favorites: Movie[];
  onReorder: (next: Movie[]) => void;
  onSelect: (id: number) => void;
  onFavoriteToggle?: (message: string) => void;
}

export function FavoritesReorderList({
  favorites,
  onReorder,
  onSelect,
  onFavoriteToggle,
}: Props) {
  return (
    <Reorder.Group
      axis="y"
      className="favorites-reorder-list"
      values={favorites}
      onReorder={onReorder}
    >
      {favorites.map((movie) => (
        <Reorder.Item
          key={movie.id}
          value={movie}
          className="favorites-reorder-item"
        >
          <MovieCard
            movie={movie}
            onSelect={onSelect}
            onFavoriteToggle={onFavoriteToggle}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
