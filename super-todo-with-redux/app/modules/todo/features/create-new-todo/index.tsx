'use client';

import { TextInput } from '@mantine/core';
import { KeyboardEvent, useState } from 'react';
import { generateId } from '../../../../utils/generateId';

import { useTodo } from '../../contexts/todo';

const CreateNewTodo = () => {
  const { addTodo } = useTodo();

  const [todoTitle, setTodoTitle] = useState('');

  const handleAddTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoTitle) {
      addTodo({
        id: generateId(),
        title: todoTitle,
        completed: false,
      });
      setTodoTitle('');
    }
  };

  return (
    <TextInput
      style={{
        width: '100%',
        maxWidth: '540px',
      }}
      placeholder="What needs to be done?"
      label="Create a new todo"
      value={todoTitle}
      onChange={(event) => setTodoTitle(event.currentTarget.value)}
      onKeyDown={handleAddTodo}
    />
  );
};

export default CreateNewTodo;
