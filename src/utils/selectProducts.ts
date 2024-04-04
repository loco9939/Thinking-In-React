import { Product } from "../types/product";

export function selectProducts(products: Product[], category:string) {
	return products.filter(product => product.category === category)
}