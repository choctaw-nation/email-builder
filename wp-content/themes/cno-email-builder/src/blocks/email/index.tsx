import { registerBlockType } from '@wordpress/blocks';
import { table } from '@wordpress/icons';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

import '../../stores/responsive-styles/store';
import '../../stores/colors/store';

import Edit from './Edit';
import emailStyles from './emailStyles';

registerBlockType( metadata.name, {
	icon: table,
	edit: Edit,
	save: ( { attributes } ) => (
		<html lang="en" dir="ltr">
			<head>
				<meta charSet="UTF-8" />
				<meta
					content="text/html; charset=UTF-8"
					httpEquiv="Content-Type"
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
					/* eslint-disable react/no-unknown-property */
					// @ts-ignore react/no-unknown-property
					bgColor={ attributes.backgroundColor }
					/* eslint-enable react/no-unknown-property */
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
