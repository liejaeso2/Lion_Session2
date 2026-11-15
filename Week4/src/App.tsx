import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  useTodoCount,
  useTodosData,
  type TodoFilter,
} from "./hooks/useTodosData";

const FILTERS: { key: TodoFilter; label: string; empty: string }[] = [
  { key: "all", label: "전체", empty: "아직 등록된 할 일이 없어요." },
  { key: "active", label: "진행 중", empty: "남은 할 일이 없어요. 수고했어요!" },
  { key: "done", label: "완료", empty: "아직 완료한 할 일이 없어요." },
];

export default function App() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const { data: todos = [], isPending, isError } = useTodosData(filter);
  const { data: count } = useTodoCount();

  return (
    <main className="todo-card">
      <header className="todo-header">
        <p className="eyebrow">MY DAILY PLAN</p>
        <h1>오늘의 할 일</h1>
      </header>

      <TodoForm />

      <div className="list-heading">
        <h2>할 일 목록</h2>
        {count && (
          <span>
            {count.done} / {count.all} 완료
          </span>
        )}
      </div>

      <div className="filter-tabs" role="tablist" aria-label="할 일 필터">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            className={filter === key ? "filter-tab active" : "filter-tab"}
            onClick={() => setFilter(key)}
          >
            {label}
            {count && <span className="filter-count">{count[key]}</span>}
          </button>
        ))}
      </div>

      {isPending ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>할 일 목록을 불러오지 못했습니다.</p>
      ) : (
        <TodoList
          todos={todos}
          emptyMessage={FILTERS.find((f) => f.key === filter)!.empty}
        />
      )}
    </main>
  );
}
