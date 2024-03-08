import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import App from "./App"

describe("Button flow in App", () => {
	let button

	beforeEach(() => {
		render(<App />)
		button = screen.getByRole("button")
	})

	test("button has correct initial text", () => {
		expect(button).toHaveTextContent("Change to blue")
	})

	test("button has correct initial class", () => {
		expect(button).toHaveClass("initial-button")
	})

	test("clicking once changes the text to 'Change to red'", () => {
		fireEvent.click(button)
		expect(button).toHaveTextContent("Change to red")
	})

	test("clicking once changes the class to 'active-button'", () => {
		fireEvent.click(button)
		expect(button).toHaveClass("active-button")
	})

  test("clicking once change the color to blue", () => {
    fireEvent.click(button)
    expect(button).toHaveStyle("background-color: #646cff")
  })

	test("clicking twice reverts text to 'Change to blue'", () => {
		fireEvent.click(button)
		fireEvent.click(button)
		expect(button).toHaveTextContent("Change to blue")
	})

	test("clicking twice reverts class to 'initial-button'", () => {
		fireEvent.click(button)
		fireEvent.click(button)
		expect(button).toHaveClass("initial-button")
	})
})

describe("Checkbox controlling if the button if enabled", () => {
  let button, checkbox

  beforeEach(() => {
    render(<App />)
    button = screen.getByRole("button")
    checkbox = screen.getByRole("checkbox")
  })

  test("there is a checkbox with label 'button enabled'", () => {
    expect(screen.getByLabelText(/button enabled/i)).toBeInTheDocument()
  })

  test("button starts enabled", () => {
    expect(button).toBeEnabled()
  })

  test("button becomes disabled when checkbox is checked", () => {
    fireEvent.click(checkbox)
    expect(button).toBeDisabled()
    expect(button).toHaveStyle("opacity: 0.5")
  })

  test("button becomes enabled when checkbox is unchecked", () => {
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)
    expect(button).toBeEnabled()
  })
})

