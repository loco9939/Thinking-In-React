import { Product } from "../types/product";

export function selectProductsByText(products:Product[], text:string) {
	return products.filter(product =>product.name.includes(text))
}