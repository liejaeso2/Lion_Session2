import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../api/todo";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  /** 목록이 비었을 때 보여 줄 문구 (필터마다 다름) */
  emptyMessage?: string;
}

export default function TodoList({
  todos,
  emptyMessage = "아직 등록된 할 일이 없어요.",
}: TodoListProps) {
  const queryClient = useQueryClient();

  // 완료 상태 변경: 낙관적 업데이트
  const {
    mutate: updateTodoMutate,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateTodo,

    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (currentTodos) =>
        currentTodos?.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo,
        ),
      );

      return { prevTodos };
    },

    onError: (_error, _variables, rollbackData) => {
      if (rollbackData?.prevTodos !== undefined) {
        queryClient.setQueryData(["todos"], rollbackData.prevTodos);
      }
    },

    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 삭제: 성공 응답 후 캐시에서 직접 제거 (목록을 다시 조회하지 않음)
  const {
    mutate: deleteTodoMutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteTodo,

    onSuccess: async (deletedId) => {
      // 진행 중인 조회 결과가 삭제 전 목록을 덮어쓰지 않도록 취소
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      queryClient.setQueryData<Todo[]>(["todos"], (prevTodos) => {
        return prevTodos?.filter((todo) => todo.id !== deletedId);
      });
    },
  });

  // 수정 또는 삭제 처리 중에는 두 기능 모두 비활성화
  const isBusy = isUpdatePending || isDeletePending;

  return (
    <>
      {isUpdateError && <p role="alert">{updateError.message}</p>}
      {isDeleteError && <p role="alert">{deleteError.message}</p>}

      {todos.length === 0 ? (
        <p className="empty-message">{emptyMessage}</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  disabled={isBusy}
                  onChange={() => {
                    if (isBusy) return;

                    updateTodoMutate({
                      id: todo.id,
                      completed: !todo.completed,
                    });
                  }}
                />

                <span className={todo.completed ? "completed" : ""}>
                  {todo.title}
                </span>
              </label>

              <button
                className="delete-button"
                type="button"
                aria-label={`${todo.title} 삭제`}
                disabled={isBusy}
                onClick={() => {
                  if (isBusy) return;

                  deleteTodoMutate(todo.id);
                }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
