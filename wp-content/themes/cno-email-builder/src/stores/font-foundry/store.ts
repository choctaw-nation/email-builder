import {
	createReduxStore,
	register,
	dispatch,
	select,
	subscribe,
} from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import domReady from '@wordpress/dom-ready';
import { STORES } from '../consts';
import { actions } from './actions';
import { selectors } from './selectors';
import reducer from './reducer';

const store = createReduxStore( STORES.FONT_FOUNDRY, {
	reducer,
	actions,
	selectors,
} );

domReady( () => {
	register( store );
	const unsubscribe = subscribe( () => {
		const blocks = select( blockEditorStore ).getBlocks();

		if ( ! blocks?.length ) {
			return;
		}

		const fontBlock = findFontBlock( blocks );
		if ( fontBlock ) {
			initFontStoreFromBlocks( fontBlock );
		}
		unsubscribe();
	}, blockEditorStore );
} );

function initFontStoreFromBlocks( fontBlock: any ) {
	const { setUseDefaultFonts, setCustomFonts } = dispatch(
		STORES.FONT_FOUNDRY
	);
	const { useDefaultFonts, headingsFont, bodyFont, accentFont } =
		fontBlock.attributes;
	const customFonts = {
		headingsFont,
		bodyFont,
		accentFont,
	};
	setUseDefaultFonts( useDefaultFonts );
	if ( ! useDefaultFonts ) {
		setCustomFonts( customFonts );
	}
}

// Find the font block by name, searching all blocks recursively
function findFontBlock( blocks ) {
	for ( const block of blocks ) {
		if ( block.name === 'cno-email-blocks/font' ) {
			return block;
		}
		if ( block.innerBlocks && block.innerBlocks.length ) {
			const found = findFontBlock( block.innerBlocks );
			if ( found ) return found;
		}
	}
	return null;
}
