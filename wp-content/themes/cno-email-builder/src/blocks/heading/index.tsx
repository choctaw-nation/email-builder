import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { heading } from '@wordpress/icons';

import { calcStyleObject } from '../_shared/TypographyControls';
import { calcSpacingObject } from '../_shared/SpacingControl';

import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: heading,
	edit: Edit,
	save: ( { attributes } ) => {
		const { content, level } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				...calcStyleObject( attributes ),
				...calcSpacingObject( attributes ),
				textAlign: attributes.textAlign || 'left',
			},
			align: attributes.textAlign || 'left',
		} );
		return (
			<RichText.Content
				{ ...blockProps }
				tagName={ `h${ level }` }
				value={ content }
			/>
		);
	},
} );
