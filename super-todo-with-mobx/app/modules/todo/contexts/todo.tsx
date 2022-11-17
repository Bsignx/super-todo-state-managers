import { createContext, PropsWithChildren, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Todo, TodoFilterTypes } from '../types/todo';
import todoStore from '../stores/todo';

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

export const TodoProvider = observer(({ children }: TodoProviderProviderProps) => {
  const {
    todos,
    filteredTodos,
    addTodo: addTodoAction,
    filterTodos: filterTodosAction,
    removeCompletedTodos: removeCompletedTodosAction,
    removeTodo: removeTodoAction,
    searchTodos: searchTodosAction,
    toggleTodo: toggleTodoAction,
  } = todoStore;

  const completedTodosCount = todos.filter((todo) => todo?.completed).length || 0;
  const notCompletedTodosCount = todos.filter((todo) => !todo?.completed).length || 0;

  const addTodo = (todo: Todo) => {
    addTodoAction(todo);
  };

  const removeTodo = (todo: Todo) => {
    removeTodoAction(todo);
  };

  const toggleTodo = (todo: Todo) => {
    toggleTodoAction(todo);
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    filterTodosAction(filter);
  };

  const searchTodoList = (search: string) => {
    searchTodosAction(search);
  };

  const clearCompletedTodos = () => {
    removeCompletedTodosAction();
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
});

export const useTodo = () => {
  if (!TodoContext) {
    throw new Error('useTodo must be used within TodoProvider');
  }

  return useContext(TodoContext);
};
