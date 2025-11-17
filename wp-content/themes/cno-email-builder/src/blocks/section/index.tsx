import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: group,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
