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
				<title>{ attributes.title }</title>
			</head>
			<body
				style={ {
					margin: 0,
					padding: 0,
					width: '100% !important',
					background: `${ attributes.backgroundColor } left top`,
					'-webkit-text-size-adjust': 'none',
					'-webkit-font-smoothing': 'antialiased',
				} }
				/* eslint-disable react/no-unknown-property */
				// @ts-ignore react/no-unknown-property
				bgcolor={ attributes.backgroundColor }
				alink="#000000"
				link="#000000"
				vlink="#000000"
				/* eslint-enable react/no-unknown-property */
			>
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
		</html>
	),
} );
