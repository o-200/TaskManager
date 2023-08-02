import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import TaskPresenter, { states } from 'presenters/TaskPresenter';

const useTasks = () => {
  const { loadColumn, loadColumnMore, removeTask } = useTasksActions();

  const board = useSelector((state) => state.tasks.board);
  const loadBoard = () => states.map(({ key }) => loadColumn(key));

  const destroyTask = (task, handleClose) => {
    removeTask(task.id).then(() => {
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
