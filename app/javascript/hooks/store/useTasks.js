import { useDispatch, useSelector } from 'react-redux';
import { loadColumnSuccess } from 'slices/TasksSlice';
import { states } from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';

const useTasks = () => {
  const board = useSelector((state) => state.tasks.board);
  const dispatch = useDispatch();

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => states.map(({ key }) => loadColumnMore(key));

  return {
    board,
    loadBoard,
    loadColumnMore,
  };
};

export default useTasks;
