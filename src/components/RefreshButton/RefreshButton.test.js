import React from "react";
import RefreshButton from "./RefreshButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("RefreshButton component", () => {
  const { location } = window;
  beforeEach(() => {
    delete window.location;
    window.location = {
      reload: jest.fn(),
    };
  });

  afterEach(() => {
    window.location = location;
  });

  it("should render correctly", () => {
    const renderedComponent = render(<RefreshButton />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it("should reload the page if the button is clicked", () => {
    window.location.reload = jest.fn();

    render(<RefreshButton />);
    const button = screen.getByTestId("refresh-button");
    fireEvent.click(button);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
