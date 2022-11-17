import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../types/todo';

type TodosState = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
};

const initialState: TodosState = {
  todos: [],
  filteredTodos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
      state.filteredTodos = [...state.todos];
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
      state.filteredTodos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      state.filteredTodos = state.todos;
    },
    removeCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      state.filteredTodos = state.todos.filter((todo) => !todo.completed);
    },
    filterByStatus: (state, action: PayloadAction<string>) => {
      if (action.payload === 'all') {
        state.filteredTodos = state.todos;
      } else if (action.payload === 'active') {
        state.filteredTodos = state.todos.filter((todo) => !todo.completed);
      } else if (action.payload === 'completed') {
        state.filteredTodos = state.todos.filter((todo) => todo.completed);
      }
    },
    filterBySearch: (state, action: PayloadAction<string>) => {
      state.filteredTodos = state.todos.filter((todo) =>
        todo.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  addTodo,
  filterBySearch,
  filterByStatus,
  removeCompletedTodos,
  removeTodo,
  toggleTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
