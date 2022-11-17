export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoFilterTypes = 'all' | 'active' | 'completed';
