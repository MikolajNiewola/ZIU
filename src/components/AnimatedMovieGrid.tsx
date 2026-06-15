import { motion, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createItemVariants } from '../animations/variants';
import type { Movie } from '../hooks/useFetchMovies';
import { MovieCard } from './MovieCard';

interface Props {
  movies: Movie[];
  listKey: string;
  onSelect: (id: number) => void;
  onFavoriteToggle?: (message: string) => void;
  style?: React.CSSProperties;
}

export function AnimatedMovieGrid({
  movies,
  listKey,
  onSelect,
  onFavoriteToggle,
  style,
}: Props) {
  const shouldReduce = useReducedMotion();
  const containerVariants = createContainerVariants(!!shouldReduce);
  const itemVariants = createItemVariants(!!shouldReduce);

  return (
    <motion.div
      key={listKey}
      className="movie-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={style}
    >
      {movies.map((movie) => (
        <motion.div key={movie.id} variants={itemVariants}>
          <MovieCard
            movie={movie}
            onSelect={onSelect}
            onFavoriteToggle={onFavoriteToggle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
