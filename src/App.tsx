import { useState, useEffect } from "react";
import "./App.css";
import { useCharacters } from "./hooks/useCharacters";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";
import { useFetchGenres } from "./hooks/useFetchGenres";
import { MovieCard } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";
import { SkeletonCard } from "./components/SkeletonCard";
import { ErrorBanner } from "./components/ErrorBanner";
import { EmptyState } from "./components/EmptyState";

function App() {
  const [activeTab, setActiveTab] = useState<'movies' | 'characters'>('movies');

  const [rmPage, setRmPage] = useState(1);
  const {
    data: rmData,
    isLoading: isRMLoading,
    error: rmError,
    isFetching: isRMFetching,
  } = useCharacters(rmPage);

  const [moviePage, setMoviePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const {
    data: movieData,
    isLoading: isMoviesLoading,
    isSuccess: isMoviesSuccess,
    isFetched: isMoviesFetched,
    error: moviesError,
    isFetching: isMoviesFetching,
    isPlaceholderData: isMoviesPlaceholder,
    refetch: refetchMovies,
  } = useFetchMovies(moviePage, debouncedQuery, selectedGenre);

  const searchTooShort =
    debouncedQuery.trim().length > 0 && debouncedQuery.trim().length < 2;

  const { data: genresList } = useFetchGenres();
  const { favorites } = useFavorites();

  useEffect(() => {
    setMoviePage(1);
  }, [debouncedQuery, selectedGenre]);

  useEffect(() => {
    if (showFavoritesOnly) {
      setSearchQuery('');
      setSelectedGenre(null);
    }
  }, [showFavoritesOnly]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-logo">
          <h1>Movie Browser</h1>
        </div>
        <nav className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'movies' ? 'active' : ''}`}
            onClick={() => setActiveTab('movies')}
          >
            Przeglądarka Filmów (TMDB)
          </button>
          <button
            className={`tab-btn ${activeTab === 'characters' ? 'active' : ''}`}
            onClick={() => setActiveTab('characters')}
          >
            Postacie Rick & Morty
          </button>
        </nav>
      </header>

      {activeTab === 'movies' && (
        <main className="tab-content">
          <div className="filter-bar">
            <div className="search-wrapper">
              <label htmlFor="search-input" className="visually-hidden">
                Wyszukaj film
              </label>
              <input
                id="search-input"
                type="search"
                placeholder="Wyszukaj film (wpisz min. 2 znaki)..."
                value={searchQuery}
                disabled={showFavoritesOnly}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                  disabled={showFavoritesOnly}
                  aria-label="Wyczyść wyszukiwanie"
                >
                  &times;
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`favorites-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
            >
              {showFavoritesOnly ? '❤️ Pokaż wszystkie' : '🤍 Tylko ulubione'}
              <span className="fav-count"> ({favorites.length})</span>
            </button>
          </div>

          {!showFavoritesOnly && !searchQuery && genresList && genresList.length > 0 && (
            <div className="genre-filter-container">
              <span className="genre-label">Gatunek:</span>
              <div className="genre-badges-grid">
                <button
                  className={`genre-badge-btn ${selectedGenre === null ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(null)}
                >
                  Wszystkie
                </button>
                {genresList.map((genre) => (
                  <button
                    key={genre.id}
                    className={`genre-badge-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="content-area">
            {showFavoritesOnly ? (
              favorites.length === 0 ? (
                <EmptyState message="Brak ulubionych filmów. Dodaj filmy do ulubionych klikając ikonę serduszka na kartach filmów!" />
              ) : (
                <div className="movie-grid">
                  {favorites.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelect={setSelectedMovieId}
                    />
                  ))}
                </div>
              )
            ) : (
              <>
                {isMoviesLoading && (
                  <div className="movie-grid">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SkeletonCard key={`skeleton-${i}`} />
                    ))}
                  </div>
                )}

                {moviesError && (
                  <ErrorBanner
                    message={moviesError.message}
                    onRetry={() => refetchMovies()}
                  />
                )}

                {searchTooShort && (
                  <EmptyState message="Wpisz co najmniej 2 znaki, aby wyszukać film." />
                )}

                {!searchTooShort &&
                  isMoviesFetched &&
                  !moviesError &&
                  isMoviesSuccess &&
                  (movieData?.results?.length ?? 0) === 0 && <EmptyState />}

                {!isMoviesLoading && !moviesError && (movieData?.results?.length ?? 0) > 0 && (
                  <div
                    className="movie-grid"
                    style={{
                      opacity: isMoviesPlaceholder ? 0.5 : 1,
                      transition: "opacity 0.2s ease-in-out",
                    }}
                  >
                    {movieData?.results?.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={setSelectedMovieId}
                      />
                    ))}
                  </div>
                )}

                {!isMoviesLoading && !moviesError && (movieData?.results?.length ?? 0) > 0 && (
                  <div className="pagination-container">
                    <button
                      className="pagination-button"
                      disabled={moviePage <= 1 || isMoviesFetching}
                      onClick={() => setMoviePage((prev) => Math.max(prev - 1, 1))}
                    >
                      &larr; Poprzednia
                    </button>
                    <span className="pagination-text">
                      {isMoviesFetching ? "Wczytywanie..." : `Strona ${moviePage} z ${movieData.total_pages}`}
                    </span>
                    <button
                      className="pagination-button"
                      disabled={moviePage >= movieData.total_pages || isMoviesFetching}
                      onClick={() => setMoviePage((prev) => prev + 1)}
                    >
                      Następna &rarr;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <MovieModal
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        </main>
      )}

      {activeTab === 'characters' && (
        <main className="tab-content">
          <div className="content-area">
            {isRMLoading && (
              <div className="movie-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <SkeletonCard key={`rm-skeleton-${i}`} />
                ))}
              </div>
            )}

            {rmError && (
              <div className="error-banner">
                <h3>Błąd podczas wczytywania postaci</h3>
                <p>{rmError.message}</p>
              </div>
            )}

            {!isRMLoading && !rmError && rmData && (
              <>
                <div
                  className="characters-grid"
                  style={{
                    opacity: isRMFetching ? 0.6 : 1,
                    transition: "opacity 0.2s ease-in-out",
                  }}
                >
                  {rmData.results.map((character) => (
                    <div key={character.id} className="character-card">
                      <img src={character.image} alt={character.name} />
                      <div className="character-info">
                        <h3>{character.name}</h3>
                        <p>{character.species} • {character.status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pagination-container">
                  <button
                    className="pagination-button"
                    disabled={rmPage <= 1 || isRMFetching}
                    onClick={() => setRmPage((prev) => Math.max(prev - 1, 1))}
                  >
                    &larr; Poprzednia
                  </button>
                  <span className="pagination-text">
                    {isRMFetching ? "Wczytywanie..." : `Strona ${rmPage} z ${rmData.info.pages}`}
                  </span>
                  <button
                    className="pagination-button"
                    disabled={rmPage >= rmData.info.pages || isRMFetching}
                    onClick={() => setRmPage((prev) => prev + 1)}
                  >
                    Następna &rarr;
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
