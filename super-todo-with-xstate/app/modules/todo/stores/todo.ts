import { assign, createMachine } from 'xstate';

import { Todo, TodoFilterTypes } from '../types/todo';

type TodoContext = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
};

type TodoEvent =
  | {
      type: 'ADD_TODO' | 'REMOVE_TODO' | 'TOGGLE_TODO';
      todo: Todo;
    }
  | {
      type: 'REMOVE_COMPLETED_TODOS';
    }
  | {
      type: 'FILTER_BY_STATUS';
      filter: TodoFilterTypes;
    }
  | {
      type: 'FILTER_BY_TITLE';
      search: string;
    };

export const todoMachine = createMachine<TodoContext, TodoEvent>({
  id: 'todo',
  context: {
    todos: [],
    filteredTodos: [],
  },
  on: {
    ADD_TODO: {
      actions: assign({
        todos: (context, event) => {
          return [...context.todos, event.todo];
        },
        filteredTodos: (context, event) => {
          return [...context.todos, event.todo];
        },
      }),
    },
    REMOVE_TODO: {
      actions: assign({
        todos: (context, event) => {
          return context.todos.filter((todo) => todo.id !== event.todo.id);
        },
        filteredTodos: (context, event) => {
          return context.todos.filter((todo) => todo.id !== event.todo.id);
        },
      }),
    },
    TOGGLE_TODO: {
      actions: assign({
        todos: (context, event) => {
          return context.todos.map((todo) => {
            if (todo.id === event.todo.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }
            return todo;
          });
        },
        filteredTodos: (context, event) => {
          return context.todos.map((todo) => {
            if (todo.id === event.todo.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }
            return todo;
          });
        },
      }),
    },
    REMOVE_COMPLETED_TODOS: {
      actions: assign({
        todos: (context) => {
          return context.todos.filter((todo) => !todo.completed);
        },
        filteredTodos: (context) => {
          return context.todos.filter((todo) => !todo.completed);
        },
      }),
    },
    FILTER_BY_STATUS: {
      actions: assign({
        filteredTodos: (context, event) => {
          if (event.filter === 'all') {
            return context.todos;
          }
          if (event.filter === 'active') {
            return context.todos.filter((todo) => !todo.completed);
          }
          if (event.filter === 'completed') {
            return context.todos.filter((todo) => todo.completed);
          }

          return context.todos;
        },
      }),
    },
    FILTER_BY_TITLE: {
      actions: assign({
        filteredTodos: (context, event) => {
          return context.todos.filter((todo) => todo.title.includes(event.search));
        },
      }),
    },
  },
});
