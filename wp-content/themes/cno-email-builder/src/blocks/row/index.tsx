import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
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
	save: ( props ) => (
		<Table { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</Table>
	),
} );

function calcBlockStyle( innerBlockCount: number ): React.CSSProperties {
	const style = {
		display: 'grid',
		gap: '10px',
		gridTemplateColumns: `repeat(${ innerBlockCount }, 1fr)`,
	};
	return style;
}
