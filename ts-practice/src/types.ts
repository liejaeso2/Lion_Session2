export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodoFilterValue = "all" | "active" | "done";
