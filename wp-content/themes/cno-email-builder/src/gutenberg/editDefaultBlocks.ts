import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';
import removeDefaultBlockClasses from './removeDefaultBlockClasses';
import { disableAdvancedPanel } from './disableAdvancedPanel';
import { initHeadingFontSync, initBodyFontSync } from './font-sync';

domReady( () => {
	const namespace = 'cno-email-builder';
	const filters = {
		'cno-remove-default-block-classes': removeDefaultBlockClasses,
		'cno-disable-advanced-panel': disableAdvancedPanel,
	};
	Object.entries( filters ).forEach( ( [ filterName, filterCallback ] ) => {
		addFilter(
			'blocks.registerBlockType',
			`${ namespace }/${ filterName }`,
			filterCallback
		);
	} );
	initHeadingFontSync();
	initBodyFontSync();
} );
