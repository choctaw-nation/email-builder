export default function FlexContainer( {
	gap,
	children,
}: {
	gap?: number | string;
	children: React.ReactNode;
} ) {
	return (
		<div
			style={ {
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: gap || 10,
			} }
		>
			{ children }
		</div>
	);
}
