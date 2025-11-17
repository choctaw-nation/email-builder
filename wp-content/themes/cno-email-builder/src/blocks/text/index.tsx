import { registerBlockType } from '@wordpress/blocks';
import { paragraph } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: paragraph,
	edit: Edit,
} );
