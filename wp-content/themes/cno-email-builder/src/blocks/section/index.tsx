import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../lib/allowedBlocks';
import { SectionTable as Table } from '../lib/Table';

registerBlockType( metadata.name, {
	icon: group,
	edit: () => {
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			allowedBlocks: Object.values( allowedBlocks )
				.flat()
				.filter( ( blockName ) => blockName !== metadata.name ),
			template: [
				[ 'core/paragraph', { placeholder: 'Add some content...' } ],
			],
		} );
		return <div { ...innerBlocksProps } />;
	},
	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<Table { ...blockProps }>
				<InnerBlocks.Content />
			</Table>
		);
	},
} );
