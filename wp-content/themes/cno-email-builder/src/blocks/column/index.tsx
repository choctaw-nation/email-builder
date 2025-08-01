import { registerBlockType } from '@wordpress/blocks';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { column } from '@wordpress/icons';

import metadata from './block.json';

registerBlockType( metadata.name, {
	icon: column,
	edit: () => {
		return (
			<div
				{ ...useInnerBlocksProps( useBlockProps(), {
					template: [
						[
							'core/paragraph',
							{ placeholder: 'Column content...' },
						],
					],
				} ) }
			/>
		);
	},
	save: () => {
		return (
			<td>
				<InnerBlocks.Content />
			</td>
		);
	},
} );
