import { registerBlockType } from '@wordpress/blocks';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { column } from '@wordpress/icons';

import { responsiveClassNames } from '../lib/responsiveHelpers';
import metadata from './block.json';
import { STORES } from '../../stores/consts';

registerBlockType( metadata.name, {
	icon: column,
	edit: ( { setAttributes, context, ...props } ) => {
		const canWrap = context[ 'cno-email-blocks/canWrap' ];
		const { addBlockType, removeBlockType } = useDispatch(
			STORES.RESPONSIVE_STYLES
		);
		const isLastBlock = useSelect(
			( select ) =>
				select( STORES.RESPONSIVE_STYLES ).isLastBlock(
					props.clientId
				),
			[ canWrap ]
		);
		useEffect( () => {
			setAttributes( { isResponsive: canWrap, isLastBlock } );
			if ( canWrap ) {
				addBlockType( props.clientId );
			}
			return () => {
				if ( canWrap ) {
					removeBlockType( props.clientId );
				}
			};
		}, [ canWrap ] );
		return (
			<div
				{ ...useInnerBlocksProps(
					useBlockProps( {
						className: canWrap
							? responsiveClassNames.col
							: undefined,
					} ),
					{
						template: [
							[
								'core/paragraph',
								{ placeholder: 'Column content...' },
							],
						],
					}
				) }
			/>
		);
	},
	save: ( { attributes } ) => {
		const { isResponsive, isLastBlock } = attributes;
		const classes: string[] = [];
		if ( isResponsive ) {
			classes.push( responsiveClassNames.col );
		}
		if ( ! isLastBlock ) {
			classes.push( 'not-last' );
		}
		return (
			<td
				{ ...useBlockProps.save( {
					className: classes.join( ' ' ),
				} ) }
			>
				<InnerBlocks.Content />
			</td>
		);
	},
} );
