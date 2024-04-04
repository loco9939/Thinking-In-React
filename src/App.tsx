import FilterableProductTable from "./components/FilterableProductTable";
import { Product } from "./types/product";

const products:Product[] = [
	{
		category: 'Fruits', price: '$1', stocked: true, name: 'Apple',
	},
	{
		category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit',
	},
	{
		category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit',
	},
	{
		category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach',
	},
	{
		category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin',
	},
	{
		category: 'Vegetables', price: '$1', stocked: true, name: 'Peas',
	},
];

function App() {


	return (
	<div>
		<h1>상품</h1>
		<FilterableProductTable products={products} />
	</div>
	);
}

export default App;


/**
 * ⭐️ 목적: UI를 컴포넌트 계층으로 쪼개고 정적인 버전의 React를 구현한다.
 *
 * 1. 복잡한 UI를 간단한 컴포넌트로 분해한다.
 * 카테고리와 품목이 중복되어 사용되므로 컴포넌트로 추출한다. Extract Function
 *
 * 2. CategoryInProducts 컴포넌트의 props로 category와 products를 전달한다.
 * 	CategoryInProducts 컴포넌트 내부에서 category는 그대로 사용하고,
 * 	products는 필터링을 거쳐 해당 카테고리에 속하는 products만 노출한다.
 *
 * 우선, category를 props로 전달할 때, products에서 category를 추출해서 전달해야한다.
 * 해당 작업을 SRP 원칙에 따라 분리한다.
 * 또한, CategoryInProducts 내부에서 products를 필터링해주는 로직도 SRP 원칙에 따라 분리한다.
 *
 * 3. CategoryInProducts 컴포넌트를 구현했으니 상위 계층에서 컴포넌트로 쪼갤 것이 있는지 확인
 * table 태그 부분을 ProductsTable 컴포넌트로 쪼개보자
 *
 * ProductsTable에서 thead 부분은 데이터타입이 변경되지 않는 조건에서, 변경되지 않을 부분이므로 굳이
 * 컴포넌트로 추출하지 않아도 될 것 같아서 아샬도 추출하지 않은 것 같다.
 *
 * 단, 만약 ProductsTable의 props인 product가 바뀌게 된다면... ProductsTable이 아닌
 * 새로운 컴포넌트가 될 것이다. 단순히 새로운 컴포넌트에서도 재사용된다고해서 thead도 컴포넌트로
 * 만들어야 할까??
 *
 * 아니라고 생각한다. 그 이유는 thead가 재사용 되기는 하나, 한번 정해두면 거의 불변할 것으로 생각되기에
 * 컴포넌트로 사용하기 보다는 HTML을 그대로 사용하는 것이 좋아보인다. 하지만 상황에 따라 다를 것 같다.
 *
 * 4. ProductsTable을 만들었으니 같은 계층에서 컴포넌트로 쪼갤 부분을 생각한다.
 * 지금까지는 복잡하고 특수한 UI를 단순한 컴포넌트 조합으로 만들기 위해 컴포넌트를 쪼갰다면,
 * 이번에는 CheckboxField라는 컴포넌트를 공통으로 사용될 컴포넌트를 만들 목적으로 컴포넌트를 쪼개보자.
 *
 * 5. CheckboxField와 input이 덩그러니 있는 것 같아 특수한 목적에 맞게 컴포넌트로 쪼갰다.
 *
 * 6. SearchBar, ProductsTable을 아우르는 하나의 컴포넌트로 구현하여 App이 맡는 역할을 최소한으로
 * 구현한다.
 */

/**
 * ⭐️ 목적: state를 사용하여 동적인 React를 구현한다.
 *
 * state를 사용하기 위해 다음 기준으로 state를 정한다.
 *
 * - 시간의 흐름에 따라 변하는가?
 * - 이미 존재하는 state로 계산 가능한가?
 * - 부모컴포넌트의 props로 부터 전달받는가?
 *
 * state는 시간의 흐름에 따라 변경되고 이미 존재하는 state로 계산가능하지 않아야 하며 부모한테
 * 전달받은 props로 계산가능하지 않아야한다.
 *
 * ✅ state: 검색어, 체크박스값
 * ❌ state 아닌 것: 검색어와 체크박스값에 따라 계산 가능한 필터링된 products 값
 *
 * state를 정했다면, 해당 state를 참조하는 컴포넌트들의 공통의 가장 근접한 상위 컴포넌트에서 state를
 * 정의(선언)한다.
 *
 * 1. 체크박스값
 *
 * 체크박스를 사용하는 컴포넌트인 CheckboxField와 체크박스값에 따라 계산된 품목을 보여줘야하는
 * CategoryInProducts 컴포넌트의 가장 근접한 공통의 부모 컴포넌트인 FilterableProductTable
 * 컴포넌트에 체크박스 state를 선언한다.
 *
 * 2. 검색어
 *
 * 검색어를 사용하는 SearchBar 컴포넌트와 검색어를 기반으로 필터링된 목록을 보여줘야 하는
 * CategoryInProducts 컴포넌트에서 검색어 state를 참조해야하므로 두 컴포넌트의 가장 근접한 부모
 * 컴포넌트인 FilterableProductTable 컴포넌트에 state를 선언한다.
 *
 * 상태값을 사용하여 필터링을 해주다보니 utils로 빼야할 로직들이 많이 보였다.
 *
 * 3. Input 값에 여러가지
 */