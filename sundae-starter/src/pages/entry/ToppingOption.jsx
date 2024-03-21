import { Card } from "react-bootstrap"
import { useCart } from "../../store/cartContext"

export function ToppingOption({ name, imagePath }) {
	const { updateItemCount } = useCart()

	const handleChange = (e) => {
		const value = e.target.checked ? 1 : 0
		updateItemCount(name, value, "toppings")
	}
	return (
		<Card
			style={{
				width: "15rem",
				height: "20rem",
			}}
		>
			<Card.Img alt={name + "topping"} variant="top" src={"http://localhost:3030" + imagePath} />
			<Card.Body>
				<Card.Title>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={name}
							onChange={handleChange}
						/>
						<label className="form-check-label" htmlFor={name}>
							{name}
						</label>
					</div>
				</Card.Title>
			</Card.Body>
		</Card>
	)
}
