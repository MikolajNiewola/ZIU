interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="error-banner" role="alert">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Nie udało się wczytać filmów</h3>
        <p>{message}</p>
      </div>
      <button onClick={onRetry} className="retry-btn">
        Spróbuj ponownie
      </button>
    </div>
  );
}
