import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { row } from '@wordpress/icons';

import metadata from './block.json';

import { RowTable as Table } from '../_lib/Table';
import { MAX_WIDTH } from '../_lib/consts';
import { calcSpacingObject } from '../_shared/SpacingControl';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: row,
	edit: Edit,
	save: ( { attributes } ) => {
		const { maxWidth } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				maxWidth: Math.min( maxWidth, MAX_WIDTH ),
				marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				...calcSpacingObject( attributes ),
			},
		} );
		return (
			<Table { ...blockProps }>
				<InnerBlocks.Content />
			</Table>
		);
	},
} );
