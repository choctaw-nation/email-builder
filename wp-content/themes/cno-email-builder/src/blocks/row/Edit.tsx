import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { MAX_WIDTH } from '../_lib/consts';

import RowControls from './RowControls';
import useBlockDetails from './useBlockDetails';
import { calcSpacingObject } from '../_shared/SpacingControl';

export default function Edit( props ) {
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
}

function getAlignmentStyles( alignment?: 'left' | 'center' | 'right' ): string {
	const gridAlignments = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	return gridAlignments[ alignment || 'left' ];
}
