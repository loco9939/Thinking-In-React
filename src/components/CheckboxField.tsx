import { useRef } from "react";

type CheckboxFieldProps = {
	label:string;
	inStockOnly:boolean
	setInStockOnly:(value:boolean) => void
}

export default function CheckboxField({ label,inStockOnly,setInStockOnly }:
	CheckboxFieldProps) {
	const id = useRef<string>(`checkbox-${label.replace(/ /g,'-')}`)
	return (
		<div>
			<input type="checkbox"
				id={id.current}
				checked={inStockOnly}
				onChange={() => setInStockOnly(!inStockOnly)} />
			<label htmlFor={id.current}>{label}</label>
		</div>
	)
}