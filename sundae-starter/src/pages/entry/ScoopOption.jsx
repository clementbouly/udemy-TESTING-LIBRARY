import { Card } from "react-bootstrap"
import { useCart } from "../../store/cartContext"

export function ScoopOption({ name, imagePath }) {
	const { updateItemCount } = useCart()

	const handleChange = (e) => {
		const value = Number(e.target.value)
		updateItemCount(name, value, "scoops")
	}

	return (
		<Card>
			<Card.Img alt={name + "scoop"} variant="top" src={"http://localhost:3030" + imagePath} />
			<Card.Body>
				<Card.Title>
					<div className="form-outline">
						<label className="form-label" htmlFor={"input" + name}>
							{name}
						</label>
						<input
							type="number"
							id={"input" + name}
							className="form-control"
							min={0}
							max={10}
							onChange={handleChange}
						/>
					</div>
				</Card.Title>
			</Card.Body>
		</Card>
	)
}
