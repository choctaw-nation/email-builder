import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import '../../stores/responsive-styles/store';
import metadata from './block.json';
import { STORES } from '../../stores/consts';

registerBlockType( metadata.name, {
	edit: ( { setAttributes } ) => {
		const responsiveBlocks = useSelect( ( select: any ) => {
			const store = select( STORES.RESPONSIVE_STYLES );
			const blockTypes = store.getResponsiveBlockTypes();
			return blockTypes;
		}, [] );

		useEffect( () => {
			setAttributes( { responsiveBlocks } );
		}, [ responsiveBlocks ] );
	},
	save: () => null,
} );
