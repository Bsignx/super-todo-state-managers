'use client';

import { Badge, Button, Box, TextInput } from '@mantine/core';
import { ChangeEvent, useState } from 'react';

import { useTodo } from '../../contexts/todo';

const FilterTodos = () => {
  const { notCompletedTodosCount, filterTodoList, clearCompletedTodos, searchTodoList } = useTodo();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    searchTodoList(event.currentTarget.value);
  };

  return (
    <>
      <Box
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          maxWidth: '540px',
        }}
      >
        <Badge>{notCompletedTodosCount} item(s) left</Badge>
        <Button onClick={() => filterTodoList('all')}>All</Button>
        <Button onClick={() => filterTodoList('active')}>Active</Button>
        <Button onClick={() => filterTodoList('completed')}>Completed</Button>
        <Button onClick={clearCompletedTodos}>Clear completed</Button>
      </Box>
      <TextInput
        style={{
          width: '100%',
          maxWidth: '540px',
        }}
        placeholder="What do you want to search for?"
        label="Search todos"
        value={searchValue}
        onChange={handleSearch}
      />
    </>
  );
};

export default FilterTodos;
