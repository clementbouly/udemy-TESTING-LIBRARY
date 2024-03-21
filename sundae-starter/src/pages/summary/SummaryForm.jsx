import { useState } from "react"
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap"

export function SummaryForm() {
	const [isChecked, setIsChecked] = useState(false)

	const handleCheck = (e) => {
		setIsChecked(e.target.checked)
	}

	const Link = ({ id, children, title }) => (
		<OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>} placement="right">
			<a href="#">{children}</a>
		</OverlayTrigger>
	)

	const termsAndConditionsDetails = "No ice cream will actually be delivered"

	return (
		<Form style={{ border: "1px solid red" }}>
			<Form.Group className="mb-3">
				<label>
					<input className="form-check-input me-1" type="checkbox" onChange={handleCheck} checked={isChecked} />I agree to the{" "}
					<Link id="terms" title={termsAndConditionsDetails}>
						terms and conditions
					</Link>
				</label>
			</Form.Group>

			<Button type="submit" disabled={!isChecked}>
				Confirm order
			</Button>
		</Form>
	)
}
