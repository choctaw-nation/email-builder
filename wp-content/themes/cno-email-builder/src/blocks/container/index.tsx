import { registerBlockType } from '@wordpress/blocks';
import { homeButton } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: () => {
		return (
			<div
				{ ...useInnerBlocksProps( useBlockProps(), {
					allowedBlocks: allowedBlocks.email.filter(
						( blockName ) => blockName !== metadata.name
					),
					template: [ [ 'cno-email-blocks/section' ] ],
				} ) }
			/>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
