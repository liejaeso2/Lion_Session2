import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onSelect: (id: number) => void;
}

function TodoItem({ todo, onToggle, onRemove, onSelect }: TodoItemProps) {
  return (
    <li className={todo.done ? "todo-item done" : "todo-item"}>
      <input
        type="checkbox"
        aria-label={`${todo.text} 완료 여부`}
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <button
        type="button"
        className="todo-text"
        onClick={() => onSelect(todo.id)}
      >
        {todo.text}
      </button>
      <button
        type="button"
        className="delete-button"
        aria-label={`${todo.text} 삭제`}
        onClick={() => onRemove(todo.id)}
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
