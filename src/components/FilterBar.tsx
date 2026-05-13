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
  return (
    <div className="filter-bar">
      <div className="stats">
        <span>{activeCount}</span> / {totalCount} active tasks
      </div>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === "active" ? "active" : ""}`}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>
        <button
          className={`filter-btn ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
