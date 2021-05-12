import { List } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { isOverdue } from "../../utils";
import { errorConfig, loadingConfig, successConfig } from "../snackbarConfigs";

import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log(process.env.REACT_APP_TODO_API_URL);
  const getTodos = useCallback(() => {
    const toastKey = enqueueSnackbar("Loading Saved Data...", loadingConfig);
    fetch(`${process.env.REACT_APP_TODO_API_URL}/get`, {
      headers: {
        "X-Api-Key": process.env.REACT_APP_TODO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setTodos(data);
          closeSnackbar(toastKey);
          enqueueSnackbar("Data Loaded Successfully", {
            variant: "success",
          });
        } else {
          // need to understand other types of responses from the api
          // for now any other 200 response will render generic error message
          enqueueSnackbar("An error occured loading your data", errorConfig);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, errorConfig);
      });
  }, []);

  // initial load
  useEffect(() => {
    getTodos();
  }, []);

  const patchTodo = useCallback(async ({ id, value }) => {
    const toastKey = enqueueSnackbar("Saving...", loadingConfig);
    fetch(`${process.env.REACT_APP_TODO_API_URL}/patch/${id}`, {
      method: "PATCH",
      headers: {
        "X-Api-Key": process.env.REACT_APP_TODO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isComplete: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          closeSnackbar(toastKey);
          enqueueSnackbar("Saved Successfully", successConfig);
          // need to understand other types of responses from the api
          // for now any other 200 response will render generic error message
        } else {
          enqueueSnackbar("An error occured saving your data", errorConfig);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, errorConfig);
      });
  }, []);

  const handleClickCheckbox = useCallback((id) => {
    let value;
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          value = !todo.isComplete;
          return {
            ...todo,
            isComplete: value,
          };
        }
        return todo;
      })
    );
    patchTodo({ id, value });
  }, []);

  /* 
  SORTING REQUIREMENTS
  - if overdue, should be first
  - if completed, should be last
  - if neither, should be in middle
  - WITHIN each category should be sorted by dueDate, oldest to newest, and if no dueDate should be last
  */

  // TODO: consolidate to one performant sorting function
  const overdueTodos = todos
    .filter((todo) => !todo.isComplete && isOverdue(todo.dueDate))
    .sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && !b.dueDate) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const regularTodos = todos
    .filter((todo) => !todo.isComplete && !isOverdue(todo.dueDate))
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

  return (
    <List dense style={{ width: 750 }}>
      {sortedTodos.map(({ id, description, isComplete, dueDate }) => (
        <TodoListItem
          key={id}
          id={id}
          description={description}
          isComplete={isComplete}
          dueDate={dueDate}
          OnClickCheckbox={handleClickCheckbox}
        />
      ))}
    </List>
  );
};

export default TodoList;
