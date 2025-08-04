import { registerBlockType } from '@wordpress/blocks';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { column } from '@wordpress/icons';

import { responsiveClassNames } from '../lib/responsiveHelpers';
import metadata from './block.json';
import useResponsiveAttributes from './useResponsiveAttributes';
import ColumnControls from './ColumnControls';

registerBlockType( metadata.name, {
	icon: column,
	edit: ( props ) => {
		const { canWrap } = useResponsiveAttributes( props );
		const { width, height, align } = props.attributes;

		const innerBlocksProps = useInnerBlocksProps(
			useBlockProps( {
				style: {
					width,
					height,
					textAlign: align,
				},
				className: canWrap ? responsiveClassNames.col : undefined,
			} ),
			{
				template: [
					[ 'core/paragraph', { placeholder: 'Column content...' } ],
				],
			}
		);
		return (
			<>
				<ColumnControls { ...props } />
				<div { ...innerBlocksProps } />
			</>
		);
	},

	save: ( {
		attributes: { isResponsive, isLastBlock, align, width, height },
	} ) => {
		const classes: string[] = [];
		if ( isResponsive ) {
			classes.push( responsiveClassNames.col );
		}
		if ( ! isLastBlock ) {
			classes.push( 'not-last' );
		}
		const blockProps = useBlockProps.save( {
			width: width.replace( 'px', '' ),
			height: height.replace( 'px', '' ),
			style: {
				width,
				height,
				textAlign: align,
				display: 'table-cell',
			},
			align,
			className: classes.join( ' ' ),
		} );
		if ( width || height ) {
			blockProps.style.display = 'inline-block';
		}
		return (
			<td { ...blockProps }>
				<InnerBlocks.Content />
			</td>
		);
	},
} );
