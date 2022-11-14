import { createContext, PropsWithChildren, useContext, useReducer } from 'react';

import { initialState, reducer } from '../reducers/todo';
import { Todo, TodoFilterTypes } from '../types/todo';

type TodoContext = {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
  completedTodosCount: number;
  notCompletedTodosCount: number;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  toggleTodo: (todo: Todo) => void;
  filterTodoList: (filter: TodoFilterTypes) => void;
  searchTodoList: (search: string) => void;
  clearCompletedTodos: () => void;
};

const TodoContext = createContext({} as TodoContext);

type TodoProviderProviderProps = PropsWithChildren<{}>;

export const TodoProvider = ({ children }: TodoProviderProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const completedTodosCount = state.todos.filter((todo) => todo.completed).length || 0;
  const notCompletedTodosCount = state.todos.filter((todo) => !todo.completed).length || 0;

  const addTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const removeTodo = (todo: Todo) => {
    dispatch({ type: 'REMOVE_TODO', payload: todo });
  };

  const toggleTodo = (todo: Todo) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    dispatch({ type: 'FILTER_BY_STATUS', payload: filter });
  };

  const searchTodoList = (search: string) => {
    dispatch({ type: 'FILTER_BY_TITLE', payload: search });
  };

  const clearCompletedTodos = () => {
    dispatch({ type: 'REMOVE_COMPLETED_TODOS' });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        filteredTodos: state.filteredTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        filterTodoList,
        completedTodosCount,
        notCompletedTodosCount,
        clearCompletedTodos,
        searchTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  if (!TodoContext) {
    throw new Error('useTodo must be used within TodoProvider');
  }

  return useContext(TodoContext);
};
