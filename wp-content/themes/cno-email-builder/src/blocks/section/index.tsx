import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import save from './save';
import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';

registerBlockType( metadata.name, {
	icon: group,
	edit: () => {
		const blockProps = useBlockProps();
		return (
			<div
				{ ...useInnerBlocksProps( blockProps, {
					allowedBlocks: allowedBlocks.filter(
						( blockName ) =>
							blockName !== metadata.name &&
							blockName !== 'cno-email-blocks/container'
					),
					template: [
						[ 'core/paragraph', { placeholder: 'hey there!' } ],
					],
				} ) }
			/>
		);
	},
	save: () => <InnerBlocks.Content />,
} );
