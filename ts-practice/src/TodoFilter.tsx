import type { TodoFilterValue } from "./types";

interface TodoFilterProps {
  filter: TodoFilterValue;
  onChange: (filter: TodoFilterValue) => void;
}

function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <div className="filter-buttons" role="group" aria-label="할 일 필터">
        <button type="button" aria-pressed={filter === "all"} onClick={() => onChange("all")}>
          전체
        </button>
        <button type="button" aria-pressed={filter === "active"} onClick={() => onChange("active")}>
          진행중
        </button>
        <button type="button" aria-pressed={filter === "done"} onClick={() => onChange("done")}>
          완료
        </button>
      </div>
      <span>현재 필터: {filter}</span>
    </div>
  );
}

export default TodoFilter;
