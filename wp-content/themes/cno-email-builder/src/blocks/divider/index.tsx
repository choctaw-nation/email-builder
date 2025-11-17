import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import { separator } from '@wordpress/icons';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: separator,
	edit: Edit,
} );
