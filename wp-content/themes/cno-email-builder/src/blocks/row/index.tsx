import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { row } from '@wordpress/icons';

import metadata from './block.json';
import RowControls from './RowControls';

import { RowTable as Table } from '../_lib/Table';
import { MAX_WIDTH } from '../_lib/consts';
import useBlockDetails from './useBlockDetails';
import { calcSpacingObject } from '../_shared/SpacingControl';

registerBlockType( metadata.name, {
	icon: row,
	edit: ( props ) => {
		const { clientId } = props;
		const { maxWidth, columnGap, rowGap } = props.attributes;
		const { innerBlockCount, parentBlock } = useBlockDetails( clientId );

		const blockStyle = {
			display: 'grid',
			columnGap,
			rowGap,
			gridTemplateColumns: `repeat(${ innerBlockCount }, auto)`,
			justifyContent: getAlignmentStyles( parentBlock?.attributes.align ),
			maxWidth: Math.min( maxWidth, MAX_WIDTH ),
			marginLeft: maxWidth < MAX_WIDTH ? 'auto' : undefined,
			marginRight: maxWidth < MAX_WIDTH ? 'auto' : undefined,
			...calcSpacingObject( props.attributes ),
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

function getAlignmentStyles( alignment?: 'left' | 'center' | 'right' ): string {
	const gridAlignments = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	return gridAlignments[ alignment || 'left' ];
}
