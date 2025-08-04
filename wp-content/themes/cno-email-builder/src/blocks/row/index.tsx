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
import RowControls from './RowControls';

import { RowTable as Table } from '../lib/Table';
import { MAX_WIDTH } from '../lib/consts';

registerBlockType( metadata.name, {
	icon: row,
	edit: ( props ) => {
		const { clientId } = props;
		const { maxWidth, columnGap, rowGap } = props.attributes;
		const innerBlockCount = useSelect(
			( select ) => {
				const { getBlock } = select( blockEditorStore );
				const block = getBlock( clientId );
				return block?.innerBlocks?.length || 0;
			},
			[ clientId ]
		);
		const parentBlock = useSelect(
			( select ) => {
				const { getBlock, getBlockName, getBlockRootClientId } =
					select( blockEditorStore );
				const parentClientId = getBlockRootClientId( clientId );
				let parentBlock = null;
				if ( parentClientId ) {
					parentBlock = getBlock( parentClientId );
				}
				return parentBlock
					? {
							name: getBlockName( parentClientId ),
							attributes: parentBlock.attributes,
					  }
					: null;
			},
			[ clientId ]
		);

		const blockStyle = {
			display: 'grid',
			columnGap,
			rowGap,
			gridTemplateColumns: `repeat(${ innerBlockCount }, auto)`,
			justifyContent: getAlignmentStyles( parentBlock?.attributes.align ),
			maxWidth: Math.min( maxWidth, MAX_WIDTH ),
			marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
			marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
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
	save: ( { attributes: { columnGap, rowGap, maxWidth } } ) => {
		const blockProps = useBlockProps.save( {
			style: {
				maxWidth: Math.min( maxWidth, MAX_WIDTH ),
				marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
				marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
			},
		} );
		return (
			<Table { ...blockProps }>
				<InnerBlocks.Content />
			</Table>
		);
	},
} );

function getAlignmentStyles( alignment?: 'left' | 'center' | 'right' ): string {
	const gridAlignments = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	return gridAlignments[ alignment || 'left' ];
}
