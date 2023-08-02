import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import TaskPresenter, { states } from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';

const useTasks = () => {
  const { loadColumnInitial, loadColumn, loadColumnMore } = useTasksActions();

  const board = useSelector((state) => state.tasks.board);
  const loadBoard = () => states.map(({ key }) => loadColumn(key));

  const destroyTask = (task, handleClose) => {
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });
  };

  return {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
    destroyTask,
  };
};

export default useTasks;
