type CategoryRowProps = {
	category:string;
}

export default function CategoryRow({ category }: CategoryRowProps) {
	return (
		<tr>
			<th colSpan={2}>{category}</th>
		</tr>
	)
}