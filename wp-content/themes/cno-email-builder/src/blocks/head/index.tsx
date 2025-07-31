import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: () => null,
	save: () => null,
} );
