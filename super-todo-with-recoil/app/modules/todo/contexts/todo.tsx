import { createContext, PropsWithChildren, useContext } from 'react';
import { useRecoilState } from 'recoil';
import { filteredTodoAtom, todoAtom } from '../stores/todo';

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
  const [todos, setTodos] = useRecoilState(todoAtom);
  const [filteredTodos, setFilteredTodos] = useRecoilState(filteredTodoAtom);

  const completedTodosCount = todos.filter((todo) => todo?.completed).length || 0;
  const notCompletedTodosCount = todos.filter((todo) => !todo?.completed).length || 0;

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
    setFilteredTodos((prevTodos) => [...prevTodos, todo]);
  };

  const removeTodo = (todo: Todo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setFilteredTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  const toggleTodo = (todo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return { ...prevTodo, completed: !prevTodo.completed };
        }
        return prevTodo;
      })
    );
    setFilteredTodos((prevTodos) =>
      prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return { ...prevTodo, completed: !prevTodo.completed };
        }
        return prevTodo;
      })
    );
  };

  const filterTodoList = (filter: TodoFilterTypes) => {
    switch (filter) {
      case 'all':
        setFilteredTodos(todos);
        break;
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case 'active':
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        break;
    }
  };

  const searchTodoList = (search: string) => {
    setFilteredTodos(
      todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    setFilteredTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
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
