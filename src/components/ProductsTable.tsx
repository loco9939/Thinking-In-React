import { Product } from "../types/product";
import { selectCategory } from "../utils/selectCategory";
import CategoryInProducts from "./CategoryInProducts";

type ProductTableProps = {
	products:Product[]
	inStockOnly:boolean
	filterText:string;
}

export default function ProductsTable({
	products,
	inStockOnly,
	filterText
}: ProductTableProps) {
	const categories = selectCategory(products)
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{categories.map(category =>
					<CategoryInProducts
						key={category}
						category={category}
						products={products}
						inStockOnly={inStockOnly}
						filterText={filterText}
					/>
				)}
			</tbody>
		</table>
	)
}