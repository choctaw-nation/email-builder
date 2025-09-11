import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { column } from '@wordpress/icons';

import { responsiveClassNames } from '../_lib/responsiveHelpers';
import metadata from './block.json';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: column,
	edit: Edit,
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
