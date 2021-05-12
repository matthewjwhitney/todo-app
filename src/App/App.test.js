import { render } from "@testing-library/react";
import React from "react";
import App from ".";

jest.mock("../Header", () => () => <div>MockHeaderComponent</div>);

jest.mock("../Main", () => () => <div>MockMainComponent</div>);

it("should render correctly", () => {
  const renderedComponent = render(<App />);
  expect(renderedComponent).toMatchSnapshot();
});
