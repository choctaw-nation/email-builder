import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
} from '@wordpress/block-editor';

import metadata from './block.json';
import { separator } from '@wordpress/icons';
import Edit from './Edit';
import getBlockStyle from './getBlockStyle';

registerBlockType( metadata.name, {
	icon: separator,
	edit: Edit,
	save: ( { attributes } ) => {
		const blockProps = useBlockProps.save( {
			style: getBlockStyle( attributes ),
		} );
		return <hr { ...blockProps } />;
	},
} );
