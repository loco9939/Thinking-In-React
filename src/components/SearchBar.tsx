import { ChangeEvent } from "react";
import CheckboxField from "./CheckboxField";

type SearchBarProps = {
	inStockOnly:boolean;
	setInStockOnly: (value:boolean) => void
	filterText: string;
	setFilterText: (value:string) => void
}

export default function Searchbar({
	inStockOnly,
	setInStockOnly,
	filterText,
	setFilterText
}: SearchBarProps) {
	const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
		setFilterText(event.target.value)
	}
	return (
		<>
			<input
				type="text"
				placeholder="Search..."
				value={filterText}
				onChange={handleChange}
			/>
			<CheckboxField
				inStockOnly={inStockOnly}
				setInStockOnly={setInStockOnly}
				label="Only show products in stock"/>
		</>
	)
}