import { Product } from "../types/product";

export function selectProductsByInStock(products:Product[], checked:boolean) {
	return products.filter(product =>
		!checked || product.stocked)
}