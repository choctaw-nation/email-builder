import { registerBlockType } from '@wordpress/blocks';
import { image } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
	icon: image,
	edit: Edit,
} );
