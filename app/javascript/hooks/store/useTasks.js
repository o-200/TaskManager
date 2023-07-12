import { useDispatch, useSelector } from 'react-redux';
import { loadColumnSuccess, loadColumnMoreSuccess } from 'slices/TasksSlice';
import { states } from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';

const useTasks = () => {
  const board = useSelector((state) => state.tasks.board);
  const dispatch = useDispatch();

  const loadColumnInitial = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
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

  const loadBoard = () => states.map(({ key }) => loadColumn(key));

  return {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
  };
};

export default useTasks;
