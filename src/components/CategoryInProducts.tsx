import { Product } from "../types/product";
import { filterProducts } from "../utils/filterProducts";
import { selectProducts } from "../utils/selectProducts";
import CategoryRow from "./CategoryRow";
import ProductRow from "./ProductRow";

type CategoryInProductsProps = {
	category:string;
	products: Product[]
	inStockOnly:boolean;
	filterText:string;
}

// 카테고리부분도 컴포넌트로 할까? 고민해봤을 때, 단일책임원칙과 일관성에 의거하여 컴포넌트로 구성해보자.
export default function CategoryInProducts({
	category,
	products,
	inStockOnly,
	filterText
}: CategoryInProductsProps) {
		const filteredProducts = filterProducts(products, {text:filterText, checked:inStockOnly})

		// 카테고리에 해당하는 products만 노출해주는게 맞다.
		const filteredProductsByCategory = selectProducts(filteredProducts,category)
	return (
		<>
			<CategoryRow category={category}/>
			{filteredProductsByCategory.map(product =>
				<ProductRow key={product.name} product={product}/>
			)}
		</>
	)
}