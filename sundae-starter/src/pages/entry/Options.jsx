import { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import { useCart } from "../../store/cartContext"
import { ScoopOption } from "./ScoopOption"
import { ToppingOption } from "./ToppingOption"

export function Options({ optionType }) {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { scoopsSubTotal, toppingsSubTotal } = useCart()

	useEffect(() => {
		setLoading(true)
		fetch(`http://localhost:3030/${optionType}`)
			.then((response) => response.json())
			.then((data) => {
				setItems(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error fetching items", error)
				setError("Error fetching items")
				setLoading(false)
			})
	}, [optionType])

	if (loading) {
		return <div>Loading...</div>
	}

	const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption
	const optionItems = items.map((item) => {
		return (
			<li className="col mb-3" key={item.name}>
				<ItemComponent key={item.name} {...item} />
			</li>
		)
	})

	const itemPrice = optionType === "scoops" ? 2.0 : 1.5

	const subTotal = optionType === "scoops" ? scoopsSubTotal : toppingsSubTotal

	return (
		<div className="container">
			<h2>{optionType}</h2>
			<div className="price-subTotal">
				<h3>Price: ${itemPrice} each</h3>
				<h3>
					{optionType} total : ${subTotal}
				</h3>
			</div>
			<ul className="row">
				{optionItems}
				{items.length === 0 && !error && <div>No items</div>}
				{error && <Alert variant="danger">{error}</Alert>}
			</ul>
		</div>
	)
}
