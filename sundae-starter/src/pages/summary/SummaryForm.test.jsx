import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import { SummaryForm } from "./SummaryForm"

describe("SummaryForm", () => {
	let button, checkbox, user

	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-lifecycle
		render(<SummaryForm />)
		button = screen.getByRole("button", { name: /confirm order/i })
		checkbox = screen.getByRole("checkbox")
		user = userEvent.setup()
	})

	test("render a checkbox and a label to accept terms and conditions", () => {
		const label = screen.getByText(/terms and conditions/i)

		expect(checkbox).toBeInTheDocument()
		expect(checkbox).not.toBeChecked()
		expect(label).toBeInTheDocument()
	})

	test("render a button with the text 'Confirm Order' disabled initially", () => {
		expect(button).toBeDisabled()
	})

	test("button is enabled when checkbox is checked", async () => {
		await user.click(checkbox)
		expect(button).toBeEnabled()
	})

	test("button is disabled when checkbox is unchecked", async () => {
		await user.click(checkbox)
		await user.click(checkbox)
		expect(button).toBeDisabled()
	})

	test("terms and conditions should be a styled as a link", () => {
		const termsAndConditions = screen.getByRole("link", { name: /terms and conditions/i })
		expect(termsAndConditions).toBeInTheDocument()
	})

	test("when hovering over the terms and conditions link a tooltip with more details should appear", async () => {
		const nullTooltip = screen.queryByText(/no ice cream will actually be delivered/i)
		expect(nullTooltip).not.toBeInTheDocument()
		const termsAndConditions = screen.getByText(/terms and conditions/i)
		await user.hover(termsAndConditions)
		const tooltip = screen.getByText(/no ice cream will actually be delivered/i)
		expect(tooltip).toBeInTheDocument()
		await user.unhover(termsAndConditions)
		expect(tooltip).not.toBeInTheDocument()
	})
})
