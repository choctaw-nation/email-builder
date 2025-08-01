export function SectionTable( { children, ...props } ) {
	return (
		<Table { ...props } type="section">
			{ children }
		</Table>
	);
}

export function RowTable( { children, ...props } ) {
	return (
		<Table { ...props } type="row">
			{ children }
		</Table>
	);
}
function Table( {
	children,
	type,
	...props
}: {
	children: React.ReactNode;
	type: 'section' | 'row';
} ) {
	return (
		<table
			align="center"
			width={ '100%' }
			border={ 0 }
			cellPadding={ 0 }
			cellSpacing={ 0 }
			role="presentation"
			{ ...props }
		>
			{ type === 'row' ? (
				<tbody width="100%">
					<tr width="100%">{ children }</tr>
				</tbody>
			) : (
				<tbody>
					<tr>
						<td>{ children }</td>
					</tr>
				</tbody>
			) }
		</table>
	);
}
