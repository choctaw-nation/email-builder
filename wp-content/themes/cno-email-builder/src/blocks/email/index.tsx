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
import '../../stores/responsive-styles/store';
import BlockControls from './BlockControls';
import { STORES } from '../../stores/consts';
import { FontsData } from '../_lib/types';

registerBlockType( metadata.name, {
	icon: table,
	edit: ( props ) => {
		const {
			attributes: { previewText, fontUrl, headingsFont, bodyFont },
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
				template: [
					[
						'cno-email-blocks/container',
						{
							attributes: { lock: { move: true, remove: true } },
						},
						[ [ 'cno-email-blocks/text' ] ],
					],
				],
				templateLock: false,
				renderAppender: false,
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
					<style
						type="text/css"
						dangerouslySetInnerHTML={ {
							__html: `
					@import url("${ fontUrl }");
					:where(.email-wrapper__body) {
						${ emailStyles( headingsFont, bodyFont ) }
					}`,
						} }
					/>
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
							__html: `
							@import url("${ attributes.fontUrl }");
					:where(.email-wrapper__body) {
						${ emailStyles( attributes.headingsFont, attributes.bodyFont ) }
					}

				@media screen and (max-width:450px) {
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
				<body
					style={ {
						margin: 0,
						padding: 0,
						backgroundColor: attributes.backgroundColor,
					} }
					bgColor={ attributes.backgroundColor }
				>
					<div
						style={ {
							display: 'none',
							overflow: 'hidden',
							lineHeight: '1px',
							opacity: 0,
							maxHeight: 0,
							maxWidth: 0,
						} }
						data-skip-in-text="true"
					>
						{ attributes.previewText }
					</div>
					<InnerBlocks.Content />
				</body>
			</head>
		</html>
	),
} );

function emailStyles( headingsFont: FontsData, bodyFont: FontsData ): string {
	return `
		body,p,a,td {
			text-wrap:balance;
			font-family: ${ bodyFont.name }, ${ bodyFont.fallbackStack.value }
		}
		
		h1,h2,h3,h4,h5,h6 {
			text-wrap:balance;
			font-family: ${ headingsFont.name }, ${ headingsFont.fallbackStack.value };
		}
	`;
}
