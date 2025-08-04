export const allowedBlocks = {
	email: [
		'row',
		'container',
		'column',
		'divider',
		'section',
		'image',
		'link',
		'button',
	].map( ( name ) => `cno-email-blocks/${ name }` ),
	core: [ 'core/paragraph', 'core/heading', 'core/list', 'core/list-item' ],
};
