import { useState } from "react";
import { Product } from "../types/product";
import ProductsTable from "./ProductsTable";
import Searchbar from "./SearchBar";

type FilterableProductTableProps = {
	products: Product[]
}

export default function FilterableProductTable({ products }:
	FilterableProductTableProps) {
		const [inStockOnly, setInStockOnly] = useState<boolean>(false)
		const [filterText, setFilterText] = useState<string>('')
	return (
		<>
			<Searchbar
				inStockOnly={inStockOnly}
				setInStockOnly={setInStockOnly}
				filterText={filterText}
				setFilterText={setFilterText}
			/>
			<ProductsTable
				inStockOnly={inStockOnly}
				products={products}
				filterText={filterText}
			/>
		</>
	)
}