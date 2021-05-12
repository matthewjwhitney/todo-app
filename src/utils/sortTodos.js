import { getIsOverdue } from ".";

const sortTodos = (todos) => {
  /* 
  S ORTING REQUIREMENTS
  - if overdue, should be first
  - if completed, should be last
  - if neither, should be in middle
  - WITHIN each category should be sorted by dueDate, oldest to newest, and if no dueDate should be last
  */

  // TODO: consolidate to one performant sorting function
  const overdueTodos = todos
    .filter((todo) => !todo.isComplete && getIsOverdue(todo.dueDate))
    .sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && !b.dueDate) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const regularTodos = todos
    .filter((todo) => !todo.isComplete && !getIsOverdue(todo.dueDate))
    .sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && !b.dueDate) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const completedTodos = todos
    .filter((todo) => todo.isComplete)
    .sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && !b.dueDate) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const sortedTodos = [...overdueTodos, ...regularTodos, ...completedTodos];

  return sortedTodos;
};

export default sortTodos;
