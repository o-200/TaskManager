import { createSlice } from '@reduxjs/toolkit';
import { propEq } from 'ramda';
import { changeColumn } from '@asseinfo/react-kanban';

import { states } from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: states.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });

      return state;
    },
  },
});

export const { loadColumnSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;
