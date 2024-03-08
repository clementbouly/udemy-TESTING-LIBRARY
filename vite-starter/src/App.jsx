import { useState } from "react"

function App() {
	const [isActivated, setIsActivated] = useState(false)
	const [isButtonEnabled, setIsButtonEnabled] = useState(true)

	const handleClick = () => {
		setIsActivated((prev) => !prev)
	}

	const handleCheck = () => {
		setIsButtonEnabled((prev) => !prev)
	}

	return (
		<div>
			<h1>A simple Button </h1>

			<label>
				Button enabled
				<input type="checkbox" defaultChecked={isButtonEnabled} onChange={handleCheck} />
			</label>
			<button
				disabled={!isButtonEnabled}
				className={isActivated ? "active-button" : "initial-button"}
				onClick={handleClick}
				style={{ backgroundColor: isActivated ? "#646cff" : "#ff4d4d", opacity: isButtonEnabled ? 1 : 0.5 }}
			>
				{isActivated ? "Change to red" : "Change to blue"}
			</button>
		</div>
	)
}

export default App
