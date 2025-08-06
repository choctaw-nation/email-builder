import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { allowedBlocks } from '../_lib/allowedBlocks';
import { SectionTable as Table } from '../_lib/Table';

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
	save: ( { attributes } ) => {
		const { align } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				textAlign: align,
			},
		} );
		return (
			<Table { ...blockProps }>
				<InnerBlocks.Content />
			</Table>
		);
	},
} );
