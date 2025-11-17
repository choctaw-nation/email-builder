import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { column } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: column,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
