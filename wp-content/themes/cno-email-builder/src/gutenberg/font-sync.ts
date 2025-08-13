import { subscribe, select, dispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { STORES } from '../stores/consts';

// Keep track of last applied font value to avoid infinite loops
let lastHeadingFontName: string | undefined;
let lastBodyFontName: string | undefined;

export function initHeadingFontSync() {
	const unsubscribe = subscribe( () => {
		// 1. Get the latest fonts from your font store
		const headingsFont = select( STORES.FONT_FOUNDRY ).getHeadingsFont();
		if ( ! headingsFont ) return;
		// No heading font defined yet
		if ( headingsFont.name === lastHeadingFontName ) return;
		console.log( headingsFont );
		// Avoid redundant updates if font hasn't changed
		lastHeadingFontName = headingsFont.name;

		// 2. Get all blocks in the editor
		const allBlocks = select( blockEditorStore ).getBlocks();
		console.log( allBlocks );
		if ( ! allBlocks || allBlocks.length === 0 ) {
			return;
		}
		// 3. Filter to only custom heading blocks
		const headingBlocks = findBlockByNameRecursive( allBlocks, 'heading' );
		// 4. Update fontFamily attribute in each heading block
		headingBlocks.forEach( ( block ) => {
			if ( fontFamilyIsEmpty( block ) ) {
				dispatch( blockEditorStore ).updateBlockAttributes(
					block.clientId,
					{
						fontFamily: `${ headingsFont.name }, ${ headingsFont.fallbackStack.value }`,
					}
				);
			}
		} );
	} );

	return unsubscribe;
}
export function initBodyFontSync() {
	const unsubscribe = subscribe( () => {
		const bodyFont = select( STORES.FONT_FOUNDRY ).getBodyFont();
		if ( ! bodyFont ) return;
		if ( bodyFont.name === lastBodyFontName ) return;
		lastBodyFontName = bodyFont.name;

		const allBlocks = select( blockEditorStore ).getBlocks();
		const bodyBlocks = findBlockByNameRecursive( allBlocks, 'text' );

		bodyBlocks.forEach( ( block ) => {
			if ( fontFamilyIsEmpty( block ) ) {
				dispatch( blockEditorStore ).updateBlockAttributes(
					block.clientId,
					{
						fontFamily: `${ bodyFont.name }, ${ bodyFont.fallbackStack.value }`,
					}
				);
			}
		} );
	} );
	return unsubscribe;
}

function findBlockByNameRecursive( blocks: any[], name: string ): Array< any > {
	const targetName = `cno-email-blocks/${ name }`;
	let foundBlocks: Array< any > = [];
	for ( const block of blocks ) {
		if ( block.name === targetName ) {
			foundBlocks.push( block );
		}
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			const found = findBlockByNameRecursive(
				block.innerBlocks,
				targetName
			);
			if ( found ) {
				foundBlocks = foundBlocks.concat( found );
			}
		}
	}
	return foundBlocks;
}

function fontFamilyIsEmpty( block: any ): boolean {
	return ! block.attributes.fontFamily;
}
