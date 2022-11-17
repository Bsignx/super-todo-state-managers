'use client';

import { Center, Divider, Title } from '@mantine/core';
import { Provider } from 'react-redux';

import { TodoProvider } from '../modules/todo/contexts/todo';
import CreateNewTodo from '../modules/todo/features/create-new-todo';
import FilterTodos from '../modules/todo/features/filter-todos';
import ShowTodos from '../modules/todo/features/show-todos';
import { store } from '../modules/todo/stores/todo';

const HomePage = () => {
  return (
    <Provider store={store}>
      <TodoProvider>
        <Center
          style={{
            padding: '24px',
            backgroundColor: '#f5f5f5',
            height: '100vh',
            flexDirection: 'column',
            gap: '32px',
            justifyContent: 'flex-start',
          }}
        >
          <Title order={1} size="h2">
            TODO
          </Title>
          <CreateNewTodo />
          <Divider
            my="md"
            style={{
              width: '100%',
              maxWidth: '540px',
            }}
          />
          <FilterTodos />
          <ShowTodos />
        </Center>
      </TodoProvider>
    </Provider>
  );
};

export default HomePage;
