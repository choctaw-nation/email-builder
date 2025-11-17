import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import { heading } from '@wordpress/icons';

import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: heading,
	edit: Edit,
} );
