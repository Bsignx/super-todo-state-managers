import { createContext, PropsWithChildren, useContext } from 'react';

import { Todo, TodoFilterTypes } from '../types/todo';
import { useAppDispatch, useAppSelector } from '../stores/todo';
import {
  addTodo as rAddTodo,
  filterBySearch as rFilterBySearch,
  removeTodo as rRemoveTodo,
  toggleTodo as rToggleTodo,
  filterByStatus as rFilterByStatus,
  removeCompletedTodos as rRemoveCompletedTodos,
} from '../slices/todosSlice';

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
  const todos = useAppSelector((state) => state.todos.todos);
  const filteredTodos = useAppSelector((state) => state.todos.filteredTodos);
  const dispatch = useAppDispatch();

  const completedTodosCount = todos.filter((todo) => todo?.completed).length || 0;

  const notCompletedTodosCount = todos.filter((todo) => !todo?.completed).length || 0;

  const addTodo = (todo: Todo) => {
    dispatch(rAddTodo(todo));
  };

  const removeTodo = (todo: Todo) => {
    dispatch(rRemoveTodo(todo));
  };

  const toggleTodo = (todo: Todo) => {
    dispatch(rToggleTodo(todo));
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    dispatch(rFilterByStatus(filter));
  };

  const searchTodoList = (search: string) => {
    dispatch(rFilterBySearch(search));
  };

  const clearCompletedTodos = () => {
    dispatch(rRemoveCompletedTodos());
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
