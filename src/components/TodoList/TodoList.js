import { List } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { sortTodos } from "../../utils";
import { errorConfig, loadingConfig, successConfig } from "../snackbarConfigs";

import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getTodos = useCallback(() => {
    const toastKey = enqueueSnackbar("Loading Saved Data...", loadingConfig);
    fetch(`${process.env.REACT_APP_TODO_API_URL}/get`, {
      headers: {
        "X-Api-Key": process.env.REACT_APP_TODO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        closeSnackbar(toastKey);
        enqueueSnackbar("Data Loaded Successfully", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, errorConfig);
      });
  }, []);

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
      .then((_data) => {
        closeSnackbar(toastKey);
        enqueueSnackbar("Saved Successfully", successConfig);
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

  const sortedTodos = sortTodos(todos);

  return (
    <List dense style={{ width: 750 }}>
      {sortedTodos.map(({ id, description, isComplete, dueDate }) => (
        <TodoListItem
          key={id}
          id={id}
          description={description}
          isComplete={isComplete}
          dueDate={dueDate}
          onClickCheckbox={handleClickCheckbox}
        />
      ))}
    </List>
  );
};

export default TodoList;
