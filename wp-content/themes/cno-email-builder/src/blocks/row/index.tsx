import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { row } from '@wordpress/icons';

import metadata from './block.json';

import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: row,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
