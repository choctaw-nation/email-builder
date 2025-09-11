import { registerBlockType } from '@wordpress/blocks';
import { group } from '@wordpress/icons';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';

import { SectionTable as Table } from '../_lib/Table';
import { calcSpacingObject } from '../_shared/SpacingControl';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: group,
	edit: Edit,
	save: ( { attributes } ) => {
		const { align } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				textAlign: align,
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
