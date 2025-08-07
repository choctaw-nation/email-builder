import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import '../../stores/responsive-styles/store';
import metadata from './block.json';
import { STORES } from '../../stores/consts';

registerBlockType( metadata.name, {
	edit: ( { setAttributes, context } ) => {
		useEffect( () => {
			setAttributes( { title: context[ 'cno-email-blocks/title' ] } );
		}, [ context ] );
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			template: [
				[
					'cno-email-blocks/font',
					{
						fontUrl: 'https://use.typekit.net/exd7pgy.css',
					},
				],
			],
			allowedBlocks: [ 'cno-email-blocks/font' ],
		} );
		const responsiveBlocks = useSelect( ( select: any ) => {
			const store = select( STORES.RESPONSIVE_STYLES );
			const blockTypes = store.getResponsiveBlockTypes();
			return blockTypes;
		}, [] );

		useEffect( () => {
			setAttributes( { responsiveBlocks } );
		}, [ responsiveBlocks ] );

		return <div { ...innerBlocksProps } />;
	},

	save: ( { attributes } ) => (
		<>
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
		</>
	),
} );
