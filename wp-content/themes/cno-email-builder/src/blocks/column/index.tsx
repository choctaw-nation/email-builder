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
import { useEffect } from '@wordpress/element';

registerBlockType( metadata.name, {
	icon: column,
	edit: ( props ) => {
		const { canWrap, isFirstBlock, isLastBlock, rowGap, columnGap } =
			useResponsiveAttributes( props );
		const { width, height, align } = props.attributes;
		const { setAttributes } = props;
		const blockEditorAlignments = {
			left: 'flex-start',
			center: 'center',
			right: 'flex-end',
		};
		useEffect( () => {
			const padding = columnGap / 2;
			if ( isFirstBlock ) {
				setAttributes( {
					padding: { paddingRight: padding },
				} );
			} else if ( isLastBlock ) {
				setAttributes( {
					padding: { paddingLeft: padding },
				} );
			} else {
				setAttributes( {
					padding: {
						paddingLeft: padding,
						paddingRight: padding,
					},
				} );
			}
		}, [ rowGap, columnGap ] );

		const innerBlocksProps = useInnerBlocksProps(
			useBlockProps( {
				style: {
					width,
					height,
					justifySelf: align
						? blockEditorAlignments[ align ]
						: undefined,
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
		attributes: {
			isResponsive,
			isLastBlock,
			padding,
			align,
			width,
			height,
		},
	} ) => {
		const classes: string[] = [];
		if ( isResponsive ) {
			classes.push( responsiveClassNames.col );
		}
		if ( ! isLastBlock ) {
			classes.push( 'not-last' );
		}
		const blockProps = useBlockProps.save( {
			width: width ? width.replace( 'px', '' ) : undefined,
			height: width ? height.replace( 'px', '' ) : undefined,
			style: {
				...padding,
				width: width ? width : undefined,
				height: height ? height : undefined,
				textAlign: align,
				display: undefined,
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
