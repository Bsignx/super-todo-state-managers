import { Dispatch, SetStateAction } from 'react';
import { Subject } from 'rxjs';

import { Todo, TodoFilterTypes } from '../types/todo';

export type TodoState = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
};

const subject = new Subject<TodoState>();

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
};

let state = initialState;

const todoStore = {
  init: () => subject.next(state),
  subscribe: (setState: Dispatch<SetStateAction<any>>) => subject.subscribe(setState),
  unsubscribe: () => subject.unsubscribe(),
  addTodo: (todo: Todo) => {
    state = {
      ...state,
      todos: [...state.todos, todo],
      filteredTodos: [...state.todos, todo],
    };
    subject.next(state);
  },
  removeTodo: (todo: Todo) => {
    state = {
      ...state,
      todos: state.todos.filter((t) => t.id !== todo.id),
      filteredTodos: state.todos.filter((t) => t.id !== todo.id),
    };
    subject.next(state);
  },
  toggleTodo: (todo: Todo) => {
    state = {
      ...state,
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
    };
    subject.next(state);
  },
  removeCompletedTodos: () => {
    state = {
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
      filteredTodos: state.todos.filter((todo) => !todo.completed),
    };
    subject.next(state);
  },
  filterTodosByStatus: (filter: TodoFilterTypes) => {
    state = {
      ...state,
      filteredTodos: (() => {
        if (filter === 'all') {
          return state.todos;
        }
        if (filter === 'completed') {
          return state.todos.filter((todo) => todo.completed);
        }
        if (filter === 'active') {
          return state.todos.filter((todo) => !todo.completed);
        }

        return state.todos;
      })(),
    };
    subject.next(state);
  },
  filterTodosBySearch: (search: string) => {
    state = {
      ...state,
      filteredTodos: state.todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      ),
    };
    subject.next(state);
  },
  initialState,
};

export default todoStore;
