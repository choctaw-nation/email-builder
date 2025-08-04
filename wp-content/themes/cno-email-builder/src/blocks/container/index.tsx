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
		const innerBlocksProps = useInnerBlocksProps( useBlockProps(), {
			allowedBlocks: Object.values( allowedBlocks ).flat(),
			defaultBlocks: [ [ 'cno-email-blocks/section' ] ],
		} );
		return <div { ...innerBlocksProps } />;
	},
	save: () => <InnerBlocks.Content />,
} );
