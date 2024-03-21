import { HttpResponse, http } from "msw"

export const handlers = [
	http.get("http://localhost:3030/scoops", () => {
		return HttpResponse.json([
			{ name: "Mint chip", imagePath: "/images/mint-chip.png" },
			{ name: "Vanilla", imagePath: "/images/vanilla.png" },
			{ name: "Chocolate", imagePath: "/images/chocolate.png" },
		])
	}),

	http.get("http://localhost:3030/toppings", () => {
		return HttpResponse.json([
			{ name: "M&Ms", imagePath: "/images/m-and-ms.png" },
			{ name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
			{ name: "Peanut butter cups", imagePath: "/images/peanut-butter-cups.png" },
		])
	}),
]
