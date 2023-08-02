import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import AddPopup from 'components/AddPopup';
import ColumnHeader from 'components/ColumnHeader';
import EditPopup from 'components/EditPopup';
import Task from 'components/Task';
import TasksRepository from 'repositories/TasksRepository';
import useTasks from 'hooks/store/useTasks';

import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

function TaskBoard() {
  const { board, loadBoard, loadColumnMore, createTask, destroyTask, updateTask, moveCard } = useTasks();
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => loadBoard(), []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleCardDragEnd = (task, source, destination) => moveCard(task, source, destination);

  const handleTaskLoad = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const handleTaskCreate = (params) => createTask(params, handleClose);

  const handleTaskUpdate = (task) => updateTask(task, handleClose);

  const handleTaskDestroy = (task) => destroyTask(task, handleClose);

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
}

export default TaskBoard;
