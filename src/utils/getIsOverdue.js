const getIsOverdue = (dueDate) => {
  if (dueDate && new Date() - new Date(dueDate) > 0) {
    return true;
  }
  return false;
};

export default getIsOverdue;
