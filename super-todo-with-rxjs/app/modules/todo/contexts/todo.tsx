import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import todoStore, { TodoState } from '../stores/todo';

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
  const [state, setState] = useState<TodoState>(todoStore.initialState);

  const completedTodosCount = state.todos.filter((todo) => todo?.completed).length || 0;
  const notCompletedTodosCount = state.todos.filter((todo) => !todo?.completed).length || 0;

  const addTodo = (todo: Todo) => {
    todoStore.addTodo(todo);
  };

  const removeTodo = (todo: Todo) => {
    todoStore.removeTodo(todo);
  };

  const toggleTodo = (todo: Todo) => {
    todoStore.toggleTodo(todo);
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    todoStore.filterTodosByStatus(filter);
  };

  const searchTodoList = (search: string) => {
    todoStore.filterTodosBySearch(search);
  };

  const clearCompletedTodos = () => {
    todoStore.removeCompletedTodos();
  };

  useLayoutEffect(() => {
    todoStore.subscribe(setState);
    todoStore.init();
  }, []);

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
