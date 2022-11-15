import { createContext, PropsWithChildren, useContext } from 'react';
import { useMachine } from '@xstate/react';

import { Todo, TodoFilterTypes } from '../types/todo';
import { todoMachine } from '../stores/todo';

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
  const [state, send] = useMachine(todoMachine);

  const completedTodosCount = state.context.todos.filter((todo) => todo?.completed).length || 0;
  const notCompletedTodosCount = state.context.todos.filter((todo) => !todo?.completed).length || 0;

  const addTodo = (todo: Todo) => {
    send('ADD_TODO', { todo });
  };

  const removeTodo = (todo: Todo) => {
    send('REMOVE_TODO', { todo });
  };

  const toggleTodo = (todo: Todo) => {
    send('TOGGLE_TODO', { todo });
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    send('FILTER_BY_STATUS', { filter });
  };

  const searchTodoList = (search: string) => {
    send('FILTER_BY_TITLE', { search });
  };

  const clearCompletedTodos = () => {
    send('REMOVE_COMPLETED_TODOS');
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.context.todos,
        filteredTodos: state.context.filteredTodos,
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
