import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';
import UserPresenter from './UserPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.text,
    author: UserPresenter.shape(),
    assignee: UserPresenter.shape(),
    state: PropTypes.string,
    transitions: PropTypes.array,
  },
  {
    taskName(task) {
      return `${this.name(task)}`;
    },

    taskDescription(task) {
      return `${this.description(task)}`;
    },

    taskAssignee(task) {
      return this.assignee(task);
    },

    taskAuthor(task) {
      return this.author(task);
    },

    taskState(task) {
      return `${this.state(task)}`;
    },

    taskTransitions(task) {
      return this.transitions(task);
    },
  },
);
