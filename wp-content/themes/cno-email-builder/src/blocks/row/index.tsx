import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import metadata from './block.json';

import { RowTable as Table } from '../lib/Table';
import { row } from '@wordpress/icons';

registerBlockType( metadata.name, {
	icon: row,
	edit: () => (
		<div
			{ ...useInnerBlocksProps( useBlockProps(), {
				template: [ [ 'cno-email-blocks/column' ] ],
				defaultBlock: 'cno-email-blocks/column',
			} ) }
		/>
	),
	save: ( props ) => (
		<Table { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</Table>
	),
} );
