import { Todo, TodoFilterTypes } from '../types/todo';

export type TodoState = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
};

type TodoActions =
  | {
      type: 'ADD_TODO' | 'REMOVE_TODO' | 'TOGGLE_TODO';

      payload: Todo;
    }
  | {
      type: 'FILTER_BY_STATUS';
      payload: TodoFilterTypes;
    }
  | {
      type: 'FILTER_BY_TITLE';
      payload: string;
    }
  | {
      type: 'REMOVE_COMPLETED_TODOS';
    };

export const initialState = {
  todos: [],
  filteredTodos: [],
};

export function reducer(state: TodoState, action: TodoActions) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        filteredTodos: [...state.filteredTodos, action.payload],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        filteredTodos: state.filteredTodos.filter((todo) => todo.id !== action.payload.id),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
        filteredTodos: state.filteredTodos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    case 'FILTER_BY_TITLE':
      return {
        ...state,
        filteredTodos: state.todos.filter((todo) => todo.title.includes(action.payload)),
      };
    case 'FILTER_BY_STATUS':
      return {
        ...state,
        filteredTodos: (() => {
          switch (action.payload) {
            case 'all':
              return state.todos;
            case 'completed':
              return state.todos.filter((todo) => todo.completed);
            case 'active':
              return state.todos.filter((todo) => !todo.completed);
            default:
              return state.todos;
          }
        })(),
      };
    case 'REMOVE_COMPLETED_TODOS': {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
        filteredTodos: state.todos.filter((todo) => !todo.completed),
      };
    }
    default:
      return state;
  }
}
