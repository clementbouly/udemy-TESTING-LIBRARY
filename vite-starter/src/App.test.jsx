import { render, screen } from "@testing-library/react";
import App from "./App";

test("App contains correct heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/learning react/i);
  expect(headingElement).toBeInTheDocument();
});
