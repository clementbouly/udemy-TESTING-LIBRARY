import { render, screen } from "@testing-library/react"
import { HttpResponse, http } from "msw"
import { describe, test } from "vitest"
import { server } from "../../mocks/node"
import { Options } from "./Options"

describe("Options", () => {
	test("display list of scoop options if props scoops", async () => {
		render(<Options optionType="scoops" />)
		const scoopOptions = await screen.findAllByRole("spinbutton")
		expect(scoopOptions).toHaveLength(2)
	})
	test("display list of toppings if props toppings", async () => {
		render(<Options optionType="toppings" />)
		const toppingsOptions = await screen.findAllByRole("checkbox")
		expect(toppingsOptions).toHaveLength(3)
	})

	test("display image for each scoop option", async () => {
		render(<Options optionType="scoops" />)
		const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i })
		expect(scoopImages).toHaveLength(2)
	})

	test("display image for each topping option", async () => {
		render(<Options optionType="toppings" />)
		const toppingImages = await screen.findAllByRole("img", { name: /topping$/i })
		expect(toppingImages).toHaveLength(3)
	})

	test("while getting data, display loading", async () => {
		render(<Options optionType="scoops" />)
		const scoopOptions = await screen.findByText("Loading...")
		expect(scoopOptions).toBeInTheDocument()
	})

	test("should display no items when server returns empty array", async () => {
		server.resetHandlers(
			http.get("http://localhost:3030/scoops", () => {
				return HttpResponse.json([])
			})
		)
		render(<Options optionType="scoops" />)
		const scoopOptions = await screen.findByText(/no items/i)
		expect(scoopOptions).toBeInTheDocument()
	})

	test.only("should display error when server returns error", async () => {
		server.resetHandlers(
			http.get("http://localhost:3030/scoops", () => {
				return HttpResponse.error("An error occurred")
			})
		)
		render(<Options optionType="scoops" />)
		const scoopOptions = await screen.findByRole("alert")
		expect(scoopOptions).toBeInTheDocument()
	})
})
