import { makeAutoObservable, observable } from 'mobx';

import { Todo, TodoFilterTypes } from '../types/todo';

class TodoStore {
  todos: Todo[] | [] = [];
  filteredTodos: Todo[] | [] = [];

  constructor() {
    makeAutoObservable(
      this,
      {
        todos: observable,
        filteredTodos: observable,
      },
      {
        autoBind: true,
      }
    );
  }

  addTodo = (todo: Todo) => {
    this.todos = [...this.todos, todo];
    this.filteredTodos = this.todos;
  };

  removeTodo = (todo: Todo) => {
    this.todos = this.todos.filter((item) => item.id !== todo.id);
    this.filteredTodos = this.todos;
  };

  toggleTodo = (todo: Todo) => {
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    this.filteredTodos = this.todos;
  };

  removeCompletedTodos = () => {
    this.todos = this.todos.filter((item) => !item.completed);
    this.filteredTodos = this.todos.filter((item) => !item.completed);
  };

  filterTodos = (filter: TodoFilterTypes) => {
    if (filter === 'all') {
      this.filteredTodos = this.todos;
    } else if (filter === 'completed') {
      this.filteredTodos = this.todos.filter((item) => item.completed);
    } else if (filter === 'active') {
      this.filteredTodos = this.todos.filter((item) => !item.completed);
    }
  };

  searchTodos = (search: string) => {
    this.filteredTodos = this.todos.filter((item) => item.title.includes(search));
  };
}

const todoStore = new TodoStore();

export default todoStore;
