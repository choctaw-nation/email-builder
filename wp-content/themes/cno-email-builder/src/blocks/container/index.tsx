import { registerBlockType } from '@wordpress/blocks';
import { homeButton } from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
