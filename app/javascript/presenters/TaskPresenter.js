import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.text,
    author: PropTypes.object,
    assignee: PropTypes.object,
    state: PropTypes.string,
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
  },
);
