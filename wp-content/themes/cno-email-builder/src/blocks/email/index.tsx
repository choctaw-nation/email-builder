import { registerBlockType } from '@wordpress/blocks';
import { table } from '@wordpress/icons';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import metadata from './block.json';

import BlockControls from './BlockControls';
import { STORES } from '../../stores/consts';

registerBlockType( metadata.name, {
	icon: table,
	edit: ( props ) => {
		const {
			attributes: { previewText },
			setAttributes,
		} = props;
		const responsiveBlocks = useSelect( ( select: any ) => {
			const store = select( STORES.RESPONSIVE_STYLES );
			const blockTypes = store.getResponsiveBlockTypes();
			return blockTypes;
		}, [] );

		useEffect( () => {
			setAttributes( { responsiveBlocks } );
		}, [ responsiveBlocks ] );
		const blockProps = useBlockProps( { className: 'email-wrapper' } );
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'email-wrapper__body' },
			{
				template: [ [ 'cno-email-blocks/body' ] ],
			}
		);
		return (
			<>
				<BlockControls { ...props } />
				<div { ...blockProps }>
					<div className="email-wrapper__header">
						<div className="email-preview">
							<strong>Preview Text:</strong>{ ' ' }
							{ previewText && previewText }
							{ ! previewText && (
								<span className="email-preview__missing">
									No preview text!
								</span>
							) }
						</div>
					</div>
					<div { ...innerBlocksProps } />
				</div>
			</>
		);
	},
	save: ( { attributes } ) => (
		<html lang="en" dir="ltr">
			<head>
				<meta charSet="UTF-8" />
				<meta
					content="text/html; charset=UTF-8"
					http-equiv="Content-Type"
				/>
				<meta name="x-apple-disable-message-reformatting" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>{ attributes.title }</title>
				{ attributes.responsiveBlocks.length && (
					<style
						dangerouslySetInnerHTML={ {
							__html: `@media screen and (max-width:450px) {
				.responsive-col {
					width: 100% !important;
					display:block!important;
					padding:0!important;
				}
				.responsive-col.not-last {
					margin-bottom:10px;
				}
			}`,
						} }
					/>
				) }
				<InnerBlocks.Content />
			</head>
		</html>
	),
} );
