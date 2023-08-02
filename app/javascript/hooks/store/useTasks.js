import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import TaskPresenter, { states } from 'presenters/TaskPresenter';
import TaskForm from 'forms/TaskForm';

const useTasks = () => {
  const { loadColumn, loadColumnMore, newTask, removeTask, changeTask, resiteCard } = useTasksActions();

  const board = useSelector((state) => state.tasks.board);
  const loadBoard = () => states.map(({ key }) => loadColumn(key));

  const createTask = (params, handleClose) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return newTask(attributes).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });
  };

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

  const moveCard = (task, source, destination) => {
    const transition = TaskPresenter.taskTransitions(task).find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return resiteCard(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumn(destination.toColumnId);
        loadColumn(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`); // eslint-disable-line no-alert
      });
  };

  return {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
    createTask,
    destroyTask,
    updateTask,
    moveCard,
  };
};

export default useTasks;
