interface Props {
  message?: string;
}

export function EmptyState({ message = 'Nie znaleziono filmów' }: Props) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🎬</div>
      <h3>Brak wyników</h3>
      <p>{message}</p>
    </div>
  );
}
