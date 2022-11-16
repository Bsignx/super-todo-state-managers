import { createContext, PropsWithChildren, useContext } from 'react';
import { useMachine } from '@xstate/react';

import { Todo, TodoFilterTypes } from '../types/todo';
import { useTodoStore } from '../stores/todo';

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
  const {
    todos,
    filteredTodos,
    addTodo: zAddTodo,
    removeTodo: zRemoveTodo,
    toggleTodo: zToggleTodo,
    filterByTitle: zFilterByTitle,
    filterByStatus: zFilterByStatus,
    removeCompletedTodos: zRemoveCompletedTodos,
  } = useTodoStore();

  const completedTodosCount = useTodoStore(
    (state) => state.todos.filter((todo) => todo?.completed).length || 0
  );
  const notCompletedTodosCount = useTodoStore(
    (state) => state.todos.filter((todo) => !todo?.completed).length || 0
  );

  const addTodo = (todo: Todo) => {
    zAddTodo(todo);
  };

  const removeTodo = (todo: Todo) => {
    zRemoveTodo(todo);
  };

  const toggleTodo = (todo: Todo) => {
    zToggleTodo(todo);
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    zFilterByStatus(filter);
  };

  const searchTodoList = (search: string) => {
    zFilterByTitle(search);
  };

  const clearCompletedTodos = () => {
    zRemoveCompletedTodos();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
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
