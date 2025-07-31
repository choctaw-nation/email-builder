import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';

registerBlockType( metadata.name, {
	edit: () => (
		<div
			{ ...useInnerBlocksProps( useBlockProps(), {
				allowedBlocks: allowedBlocks.email,
				template: [ [ 'cno-email-blocks/container' ] ],
			} ) }
		/>
	),
	save: () => <InnerBlocks.Content />,
} );
