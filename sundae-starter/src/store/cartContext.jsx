import { createContext, useContext, useState } from "react"

const CartContext = createContext({
	scoopsSubTotal: 0,
	setScoopsQuantity: () => {},
	toppingsSubTotal: 0,
	setToppingsQuantity: () => {},
	total: 0,
	updateItemCount: () => {},
})

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error("useCart must be used within a CartProvider")
	}
	return context
}

const CartProvider = (props) => {
	const [optionCounts, setOptionCounts] = useState({
		scoops: {},
		toppings: {},
	})

	const scoopsSubTotal = Object.values(optionCounts.scoops).reduce((acc, value) => acc + value, 0) * 2
	const toppingsSubTotal = Object.values(optionCounts.toppings).reduce((acc, value) => acc + value, 0) * 1.5
	const total = scoopsSubTotal + toppingsSubTotal

	const updateItemCount = (itemName, newItemCount, optionType) => {
		const newOptionCounts = { ...optionCounts }
		newOptionCounts[optionType][itemName] = newItemCount
		setOptionCounts(newOptionCounts)
	}

	const value = {
		scoopsSubTotal,
		toppingsSubTotal,
		total,
		updateItemCount,
	}

	return <CartContext.Provider value={value} {...props} />
}

export { CartContext, CartProvider }
