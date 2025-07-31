export const allowedBlocks = {
	email: [
		'row',
		'column',
		'divider',
		'section',
		'image',
		'link',
		'button',
	].map( ( name ) => `cno-email-blocks/${ name }` ),
	core: [
		'core/paragraph',
		'core/image',
		'core/heading',
		'core/list',
		'core/list-item',
	],
};
