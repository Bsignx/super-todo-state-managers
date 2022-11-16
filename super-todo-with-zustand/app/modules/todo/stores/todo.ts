import create from 'zustand';

import { Todo } from '../types/todo';

type TodoStore = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  toggleTodo: (todo: Todo) => void;
  removeCompletedTodos: () => void;
  filterByStatus: (filter: string) => void;
  filterByTitle: (search: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filteredTodos: [],
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, todo],
      filteredTodos: [...state.todos, todo],
    }));
  },
  removeTodo: (todo) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== todo.id),
      filteredTodos: state.todos.filter((t) => t.id !== todo.id),
    }));
  },
  toggleTodo: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }

        return t;
      }),
      filteredTodos: state.todos.map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }

        return t;
      }),
    }));
  },
  removeCompletedTodos: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
      filteredTodos: state.todos.filter((todo) => !todo.completed),
    }));
  },
  filterByStatus: (filter) => {
    set((state) => ({
      filteredTodos: (() => {
        if (filter === 'all') {
          return state.todos;
        }

        if (filter === 'active') {
          return state.todos.filter((todo) => !todo.completed);
        }

        if (filter === 'completed') {
          return state.todos.filter((todo) => todo.completed);
        }

        return state.todos;
      })(),
    }));
  },
  filterByTitle: (search) => {
    set((state) => ({
      filteredTodos: state.todos.filter((todo) => todo.title.includes(search)),
    }));
  },
}));
