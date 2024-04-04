import { Product } from "../types/product"

export function selectCategory(products:Product[]) {
	return products.reduce((acc: string[], product) => {
		return acc.includes(product.category) ? acc : [...acc, product.category]
	},[])
}