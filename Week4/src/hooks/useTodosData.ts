import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todo";
import type { Todo } from "../types/todo";

export type TodoFilter = "all" | "active" | "done";

/**
 * select에 넘길 함수는 컴포넌트 밖에 둔다.
 * 함수 참조가 매번 바뀌지 않아야 TanStack Query가 select 결과를 다시 계산하지 않는다.
 */
const selectByFilter: Record<TodoFilter, (todos: Todo[]) => Todo[]> = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  done: (todos) => todos.filter((todo) => todo.completed),
};

const selectCount = (todos: Todo[]) => {
  const done = todos.filter((todo) => todo.completed).length;
  return { all: todos.length, active: todos.length - done, done };
};

/** 할 일 목록. filter에 맞는 항목만 골라서 돌려준다 (캐시는 그대로) */
export const useTodosData = (filter: TodoFilter = "all") => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 30000, // 30초 동안 Fresh, 이후 Stale
    select: selectByFilter[filter],
  });
};

/** 탭에 보여 줄 개수. 같은 ["todos"] 캐시에서 개수만 계산한다 */
export const useTodoCount = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 30000,
    select: selectCount,
  });
};
