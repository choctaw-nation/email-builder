import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import categoryIsSet from './mediapress-filters/categoryIsSet';

const filters = {
	category_is_set: categoryIsSet,
};

domReady( () => {
	Object.entries( filters ).forEach( ( [ name, filter ] ) => {
		addFilter( `mediaPress.checklist.item`, `cno/${ name }`, filter );
	} );
} );
