export default function Table( { children, ...props } ) {
	return (
		<table
			{ ...props }
			align="center"
			width={ '100%' }
			border={ 0 }
			cellPadding={ 0 }
			cellSpacing={ 0 }
			role="presentation"
		>
			<tbody>
				<tr>
					<td>{ children }</td>
				</tr>
			</tbody>
		</table>
	);
}
