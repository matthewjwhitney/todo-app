import { render } from "@testing-library/react";
import React from "react";
import Main from "./Main";

jest.mock("../components/TodoList", () => () => (
  <div>MockTodoListComponent</div>
));

it("should render correctly", () => {
  const renderedComponent = render(<Main />);
  expect(renderedComponent).toMatchSnapshot();
});
