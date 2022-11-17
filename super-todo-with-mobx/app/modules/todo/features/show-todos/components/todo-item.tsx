'use client';

import { List, Checkbox, CloseButton, Box } from '@mantine/core';
import { Todo } from '../../../types/todo';

type Props = {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
};

const TodoItem = ({ todo, onChange, onRemove }: Props) => {
  const handleChange = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    onChange(updatedTodo);
  };

  const handleRemove = () => {
    onRemove(todo);
  };

  return (
    <List.Item
      style={{
        width: '100%',
        listStyle: 'none',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '540px',
          flexDirection: 'row',
        }}
      >
        <Checkbox checked={todo.completed} label={todo.title} onChange={handleChange} />
        <CloseButton aria-label="Remove todo" onClick={handleRemove} />
      </Box>
    </List.Item>
  );
};

export default TodoItem;
