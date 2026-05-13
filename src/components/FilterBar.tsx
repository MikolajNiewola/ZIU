import type { FilterType } from "../types/todo.types";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  totalCount: number;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  activeCount,
  totalCount,
}: FilterBarProps) {
  const completedCount = totalCount - activeCount;
  const filterLabel =
    activeFilter === "all"
      ? `Wyświetlanie wszystkich ${totalCount} zadań`
      : activeFilter === "active"
        ? `Wyświetlanie ${activeCount} aktywnych zadań`
        : `Wyświetlanie ${completedCount} ukończonych zadań`;

  return (
    <nav aria-label="Filtrowanie zadań" className="filter-bar">
      <div className="stats">
        <span>{activeCount}</span> / {totalCount} aktywnych zadań
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {filterLabel}
      </div>

      <div className="filter-buttons" role="group" aria-label="Filtry zadań">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => onFilterChange("all")}
          aria-pressed={activeFilter === "all"}
        >
          Wszystkie
        </button>
        <button
          className={`filter-btn ${activeFilter === "active" ? "active" : ""}`}
          onClick={() => onFilterChange("active")}
          aria-pressed={activeFilter === "active"}
        >
          Aktywne
        </button>
        <button
          className={`filter-btn ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => onFilterChange("completed")}
          aria-pressed={activeFilter === "completed"}
        >
          Ukończone
        </button>
      </div>
    </nav>
  );
}
