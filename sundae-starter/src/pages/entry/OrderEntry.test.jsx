import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect } from "vitest"
import { CartProvider } from "../../store/cartContext"
import { Options } from "./Options"
import { OrderEntry } from "./OrderEntry"

describe("OrderEntry", () => {
	test("should update scoops subtotal correctly when adding scoops", async () => {
		const user = userEvent.setup()
		render(<Options optionType="scoops" />, { wrapper: CartProvider })
		const scoopTotal = await screen.findByText("scoops total : $", { exact: false })
		expect(scoopTotal).toHaveTextContent("0")

		const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i })

		await user.clear(vanillaInput)
		await user.type(vanillaInput, "2")

		expect(scoopTotal).toHaveTextContent("4")

		const chocolateInput = await screen.findByRole("spinbutton", { name: /chocolate/i })

		await user.clear(chocolateInput)
		await user.type(chocolateInput, "3")

		expect(scoopTotal).toHaveTextContent("10")
	})

	test("should update toppings subtotal correctly when adding toppings", async () => {
		render(<OrderEntry />, { wrapper: CartProvider })
		const mmsCheckbox = await screen.findByRole("checkbox", { name: /M&Ms/i })
		const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: /hot fudge/i })

		await userEvent.click(mmsCheckbox)
		await userEvent.click(hotFudgeCheckbox)

		const toppingsTotal = await screen.findByText("toppings total : $", { exact: false })
		expect(toppingsTotal).toHaveTextContent("3")
	})

	test("should update total correctly when adding items", async () => {
		render(<OrderEntry />, { wrapper: CartProvider })
		const vanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i })
		const mmsCheckbox = await screen.findByRole("checkbox", { name: /M&Ms/i })
		const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: /hot fudge/i })

		await userEvent.clear(vanillaInput)
		await userEvent.type(vanillaInput, "2")

		await userEvent.click(mmsCheckbox)
		await userEvent.click(hotFudgeCheckbox)

		expect(screen.getByText("Total: $7", { exact: false })).toBeInTheDocument()
	})
})
