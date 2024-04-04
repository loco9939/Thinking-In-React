import { Product } from "../types/product";
import { normalize } from "./normalize";

export function filterProducts(
	products: Product[],
	{text, checked}: {text:string; checked:boolean}
) {
	const filterByChecked = products.filter(product => !checked || product.stocked)

	const query = normalize(text);

	if (!query.length) {
		return products
	}

	const contains = (product:Product) => normalize(product.name).includes(query)

	return filterByChecked.filter(contains)
}