import { registerBlockType } from '@wordpress/blocks';
import { image } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
	icon: image,
	edit: Edit,
	save: ( { attributes } ) => {
		const { url, alt, title } = attributes;
		return <img src={ url } alt={ alt } title={ title } />;
	},
} );
