import { registerBlockType } from '@wordpress/blocks';
import { table } from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

import '../../stores/responsive-styles/store';
import '../../stores/colors/store';

import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: table,
	edit: Edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );
