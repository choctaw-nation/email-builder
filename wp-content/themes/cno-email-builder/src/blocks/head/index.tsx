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
	edit: ( { setAttributes } ) => {
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

	save: () => <InnerBlocks.Content />,
} );
