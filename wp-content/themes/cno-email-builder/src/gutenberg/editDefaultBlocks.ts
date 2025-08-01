import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';
import removeDefaultBlockClasses from './removeDefaultBlockClasses';

domReady( () => {
	const namespace = 'cno-email-builder';
	const filters = {
		'cno-remove-default-block-classes': removeDefaultBlockClasses,
	};
	Object.entries( filters ).forEach( ( [ filterName, filterCallback ] ) => {
		addFilter(
			'blocks.registerBlockType',
			`${ namespace }/${ filterName }`,
			filterCallback
		);
	} );
} );
