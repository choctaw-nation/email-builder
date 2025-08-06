import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { link, paragraph } from '@wordpress/icons';
import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';
import LinkSettings from '../_shared/LinkSettings';

registerBlockType( metadata.name, {
	icon: paragraph,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const { content, linkDestination } = attributes;
		const blockProps = useBlockProps( {
			style: {
				...calcStyleObject( attributes ),
				textAlign: attributes.textAlign || 'left',
				textDecoration: '' !== linkDestination ? 'underline' : 'none',
			},
			align: attributes.textAlign || 'left',
		} );
		return (
			<>
				<InspectorControls>
					<TypographyControls { ...props } />
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ attributes.textAlign }
						onChange={ ( textAlign ) =>
							setAttributes( { textAlign } )
						}
					/>
					<LinkSettings { ...props } />
				</BlockControls>
				<RichText
					{ ...blockProps }
					tagName="p"
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					placeholder="Type something nice here…"
					value={ content }
					onChange={ ( content ) => setAttributes( { content } ) }
				/>
			</>
		);
	},
	save: ( { attributes } ) => {
		const { content, linkDestination, rel, linkTarget } = attributes;
		const isLink = '' !== linkDestination;
		const blockProps = useBlockProps.save( {
			style: {
				...calcStyleObject( attributes ),
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
