import { render, screen } from "@testing-library/react"
import { ScoopOption } from "./ScoopOption"

describe("ScoopOption", () => {
	test("should display the correct title and image for the scoop option", () => {
		render(<ScoopOption name="Chocolate" imagePath="/images/chocolate.png" />)
		const scoopName = screen.getByText("Chocolate")
		const scoopImage = screen.getByRole("img", { name: /chocolate/i })
		expect(scoopName).toBeInTheDocument()
		expect(scoopImage).toBeInTheDocument()
	})
})
