import { render } from "@testing-library/react";
import React from "react";
import Header from "./Header";

it("should render correctly", () => {
  const renderedComponent = render(<Header />);
  expect(renderedComponent).toMatchSnapshot();
});
