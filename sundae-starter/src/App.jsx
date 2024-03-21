import { Container } from "react-bootstrap"
import { OrderEntry } from "./pages/entry/OrderEntry"
import { CartProvider } from "./store/cartContext"

function App() {
	return (
		<CartProvider>
			<Container>
				<OrderEntry />
			</Container>
		</CartProvider>
	)
}

export default App
