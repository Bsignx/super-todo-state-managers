'use client';

import { List } from '@mantine/core';
import { useTodo } from '../../contexts/todo';
import TodoItem from './components/todo-item';

const ShowTodos = () => {
  const { filteredTodos, toggleTodo, removeTodo } = useTodo();

  return (
    <List
      style={{
        width: '100%',
        maxWidth: '540px',
      }}
    >
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onChange={toggleTodo} onRemove={removeTodo} />
      ))}
    </List>
  );
};

export default ShowTodos;
