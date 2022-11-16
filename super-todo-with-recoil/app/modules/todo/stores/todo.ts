import { atom } from 'recoil';

import { Todo } from '../types/todo';

export const todoAtom = atom<Todo[] | []>({
  key: 'todoAtom',
  default: [],
});

export const filteredTodoAtom = atom<Todo[] | []>({
  key: 'filteredTodoAtom',
  default: [],
});
