import { useEffect } from 'react';
import { useMovieDetails } from '../hooks/useMovieDetails';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function MovieModal({ movieId, onClose }: Props) {
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movieId) return null;

  const posterUrl = movie?.poster_path
    ? (movie.poster_path.startsWith('http') ? movie.poster_path : `${IMG_BASE}${movie.poster_path}`)
    : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Zamknij">
          &times;
        </button>

        {isLoading && (
          <div className="modal-loading-container">
            <div className="shimmer modal-loading-poster" />
            <div className="modal-loading-info">
              <div className="shimmer modal-loading-title" />
              <div className="shimmer modal-loading-tagline" />
              <div className="shimmer modal-loading-meta" />
              <div className="shimmer modal-loading-desc" />
              <div className="shimmer modal-loading-desc" />
              <div className="shimmer modal-loading-desc" />
            </div>
          </div>
        )}

        {error && (
          <div className="modal-error">
            <p>Nie udało się wczytać szczegółów filmu: {error.message}</p>
            <button className="retry-btn" onClick={onClose}>Zamknij</button>
          </div>
        )}

        {movie && (
          <div className="modal-content">
            <div className="modal-poster-side">
              <img src={posterUrl} alt={movie.title} />
            </div>

            <div className="modal-info-side">
              <h2 className="modal-title">{movie.title}</h2>
              {movie.tagline && <p className="modal-tagline">„{movie.tagline}”</p>}

              <div className="modal-metadata">
                <span className="meta-item">📅 {movie.release_date ? movie.release_date : 'B.D.'}</span>
                {movie.runtime && <span className="meta-item">⏱️ {movie.runtime} min</span>}
                <span className="meta-item">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count} głosów)</span>
              </div>

              <div className="modal-genres">
                {movie.genres && movie.genres.map((g) => (
                  <span key={g.id} className="genre-badge">
                    {g.name}
                  </span>
                ))}
              </div>

              <div className="modal-section">
                <h3>Opis fabuły</h3>
                <p className="modal-overview">{movie.overview || 'Brak opisu fabuły dla tego filmu.'}</p>
              </div>

              <div className="modal-finances">
                {movie.budget > 0 && (
                  <div className="finance-item">
                    <span className="finance-label">Budżet</span>
                    <span className="finance-value">${movie.budget.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="finance-item">
                    <span className="finance-label">Przychód</span>
                    <span className="finance-value">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
