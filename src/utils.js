export const getMonthDayYear = (utcDate) => {
  const date = new Date(utcDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const isOverdue = (dueDate) => {
  if (dueDate && new Date() - new Date(dueDate) > 0) {
    return true;
  }
  return false;
};
