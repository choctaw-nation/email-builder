import { registerBlockType } from '@wordpress/blocks';

import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { row } from '@wordpress/icons';

import metadata from './block.json';

import { RowTable as Table } from '../lib/Table';
import RowControls from './RowControls';
import useResponsiveChildBlocks from './useResponsiveChildBlocks';

registerBlockType( metadata.name, {
	icon: row,
	edit: ( props ) => {
		const { innerBlockCount } = useResponsiveChildBlocks( props );

		const blockStyle = {
			display: 'grid',
			gap: '10px',
			gridTemplateColumns: `repeat(${ innerBlockCount }, 1fr)`,
		};
		return (
			<>
				<RowControls { ...props } />
				<div
					{ ...useInnerBlocksProps(
						useBlockProps( { style: blockStyle } ),
						{
							template: [ [ 'cno-email-blocks/column' ] ],
							defaultBlock: 'cno-email-blocks/column',
						}
					) }
				/>
			</>
		);
	},
	save: () => (
		<Table { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</Table>
	),
} );
