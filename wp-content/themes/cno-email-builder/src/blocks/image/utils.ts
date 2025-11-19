/**
 * Get the image style for the block.
 * @param attributes the block attributes
 */
export function getImageStyle( attributes ): React.CSSProperties {
	const { width, height, scale } = attributes;

	return {
		width: width || '100%',
		maxWidth: '100%',
		height: height || 'auto',
		objectFit: scale || 'cover',
		display: 'block',
	};
}
