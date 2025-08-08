export default function removeDefaultBlockClasses( settings, name: string ) {
	const emailBlocks = [
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/list-item',
	];
	if ( ! emailBlocks.includes( name ) ) {
		return settings;
	}
	return {
		...settings,
		supports: {
			...settings.supports,
			className: false, // Disable the className support for these blocks
			html: false, // Disable HTML support for these blocks
		},
	};
}
