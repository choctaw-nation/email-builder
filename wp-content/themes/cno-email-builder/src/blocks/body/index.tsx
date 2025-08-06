import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../_lib/allowedBlocks';

registerBlockType( metadata.name, {
	edit: () => {
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: allowedBlocks.email,
			template: [
				[
					'cno-email-blocks/container',
					{ attributes: { lock: { move: true, remove: true } } },
				],
			],
		} );
		return <div { ...innerBlocksProps } />;
	},
	save: () => <InnerBlocks.Content />,
} );
