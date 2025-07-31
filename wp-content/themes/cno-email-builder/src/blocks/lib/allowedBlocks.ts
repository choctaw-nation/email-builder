export const allowedBlocks = [
	'row',
	'column',
	'divider',
	'section',
	'image',
	'link',
	'container',
	'heading',
	'text',
	'button',
].map( ( name ) => `cno-email-blocks/${ name }` );
