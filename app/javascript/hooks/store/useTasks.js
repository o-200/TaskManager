import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import TaskPresenter, { states } from 'presenters/TaskPresenter';
import TaskForm from 'forms/TaskForm';

const useTasks = () => {
  const { loadColumn, loadColumnMore, removeTask, changeTask } = useTasksActions();

  const board = useSelector((state) => state.tasks.board);
  const loadBoard = () => states.map(({ key }) => loadColumn(key));

  const destroyTask = (task, handleClose) => {
    removeTask(task.id).then(() => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });
  };

  const updateTask = (task, handleClose) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return changeTask(task.id, attributes).then(() => {
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
    updateTask,
  };
};

export default useTasks;
