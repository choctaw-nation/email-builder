import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { paragraph } from '@wordpress/icons';

import { calcStyleObject } from '../_shared/TypographyControls';
import { calcSpacingObject } from '../_shared/SpacingControl';

import metadata from './block.json';
import Edit from './Edit';

registerBlockType( metadata.name, {
	icon: paragraph,
	edit: Edit,
	save: ( { attributes } ) => {
		const { content, linkDestination, rel, linkTarget } = attributes;
		const isLink = !! linkDestination;
		const blockProps = useBlockProps.save( {
			style: {
				...calcStyleObject( attributes ),
				...calcSpacingObject( attributes ),
				display: isLink ? 'inline-block' : 'block',
				textAlign: attributes.textAlign || 'left',
			},
			align: attributes.textAlign || 'left',
		} );
		return isLink ? (
			<RichText.Content
				{ ...blockProps }
				tagName="a"
				value={ content }
				href={ linkDestination }
				rel={ rel }
				target={ linkTarget }
			/>
		) : (
			<RichText.Content { ...blockProps } tagName="p" value={ content } />
		);
	},
} );
