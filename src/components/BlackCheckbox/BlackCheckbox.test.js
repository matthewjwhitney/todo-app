import { render } from "@testing-library/react";
import React from "react";
import BlackCheckbox from "./BlackCheckbox";

it("should render correctly", () => {
  const renderedComponent = render(<BlackCheckbox />);
  expect(renderedComponent).toMatchSnapshot();
});
