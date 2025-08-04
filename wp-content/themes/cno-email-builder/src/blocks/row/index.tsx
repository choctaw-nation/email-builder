import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { row } from '@wordpress/icons';

import metadata from './block.json';

import { RowTable as Table } from '../lib/Table';
import RowControls from './RowControls';

registerBlockType( metadata.name, {
	icon: row,
	edit: ( props ) => {
		const { clientId } = props;
		const innerBlockCount = useSelect(
			( select ) => {
				const { getBlock } = select( blockEditorStore );
				const block = getBlock( clientId );
				return block?.innerBlocks?.length || 0;
			},
			[ clientId ]
		);

		const blockStyle = {
			display: 'grid',
			gap: '10px',
			gridTemplateColumns: `repeat(${ innerBlockCount }, auto)`,
			justifyContent: 'flex-start',
		};
		const innerBlocksProps = useInnerBlocksProps(
			useBlockProps( { style: blockStyle } ),
			{
				template: [ [ 'cno-email-blocks/column' ] ],
				defaultBlock: 'cno-email-blocks/column',
			}
		);
		return (
			<>
				<RowControls { ...props } />
				<div { ...innerBlocksProps } />
			</>
		);
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
