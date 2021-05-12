import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TodoListItem from "./TodoListItem";

const overdueProps = {
  description: "Feed the cat",
  dueDate: "2020-06-24T15:45:00.000Z",
  id: "5",
  isComplete: false,
  onClickCheckbox: jest.fn(),
};

const regularProps = {
  description: "Walk the dog",
  dueDate: null,
  id: "4",
  isComplete: false,
  onClickCheckbox: jest.fn(),
};

const completeProps = {
  description: "File 2020 Taxes",
  dueDate: "2020-03-10T17:50:44.673Z",
  id: "1",
  isComplete: true,
  onClickCheckbox: jest.fn(),
};

it("should render an overdue todo correctly", () => {
  const renderedComponent = render(<TodoListItem {...overdueProps} />);
  expect(renderedComponent).toMatchSnapshot();
});

it("should render a regular todo correctly", () => {
  const renderedComponent = render(<TodoListItem {...regularProps} />);
  expect(renderedComponent).toMatchSnapshot();
});

it("should render a completed todo correctly", () => {
  const renderedComponent = render(<TodoListItem {...completeProps} />);
  expect(renderedComponent).toMatchSnapshot();
});

it("should perform the onClickCheckbox function if the button is clicked", () => {
  render(<TodoListItem {...regularProps} />);
  const button = screen.getByTestId("todo-list-item-button");
  fireEvent.click(button);
  expect(regularProps.onClickCheckbox).toHaveBeenCalledTimes(1);
});
