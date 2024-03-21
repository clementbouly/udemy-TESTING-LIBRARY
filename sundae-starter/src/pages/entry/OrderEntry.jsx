import { useCart } from "../../store/cartContext"
import { Options } from "./Options"

export function OrderEntry() {
	const { total } = useCart()
	return (
		<div>
			<h1>Design your Sunday !</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<div className="total">
				<h2>Total: ${total}</h2>
				<button>Order Sundae</button>
			</div>
		</div>
	)
}
