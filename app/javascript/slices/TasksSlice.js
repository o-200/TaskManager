import { createSlice } from '@reduxjs/toolkit';
import { propEq } from 'ramda';
import { changeColumn } from '@asseinfo/react-kanban';
import { useDispatch } from 'react-redux'

import TaskPresenter, { states } from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';

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
        cards: items,
        meta,
      });

      return state;
    },

    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });

      return state;
    },

    presentTaskState(task) {
      return TaskPresenter.taskState(task);
    },

    deleteTask(id) {
      return TasksRepository.destroy(id);
    },
  },
});

export const { loadColumnSuccess, loadColumnMoreSuccess, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumnInitial = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state, s: 'id DESC' },
      page,
      perPage,
    });

  const loadColumn = (state, page = 1, perPage = 10) => {
    loadColumnInitial(state, page, perPage).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumnInitial(state, page, perPage).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  return {
    loadColumnInitial,
    loadColumn,
    loadColumnMore,
  };
};
