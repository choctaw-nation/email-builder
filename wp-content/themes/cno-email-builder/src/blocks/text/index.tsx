import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { paragraph } from '@wordpress/icons';
import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';
import LinkSettings from '../_shared/LinkSettings';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import useFontData from '../_shared/_useFontData';

registerBlockType( metadata.name, {
	icon: paragraph,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const fontData = useFontData( { ...props, textType: 'body' } );
		const { content, linkDestination } = attributes;
		const isLink = !! linkDestination;
		const blockProps = useBlockProps( {
			style: {
				...calcStyleObject( attributes ),
				...calcSpacingObject( attributes ),
				textAlign: attributes.textAlign || 'left',
				textDecoration: !! linkDestination ? 'underline' : 'none',
				display: isLink ? 'inline-block' : 'block',
			},
			align: attributes.textAlign || 'left',
		} );
		return (
			<>
				<InspectorControls>
					<TypographyControls { ...props } { ...fontData } />
					<SpacingControls
						{ ...props }
						splitOnAxis={ true }
						only="margin"
					/>
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
				{ isLink ? (
					<RichText
						identifier="content"
						{ ...blockProps }
						tagName="a"
						value={ content }
						href={ linkDestination }
						disabled
						aria-disabled={ true }
					/>
				) : (
					<RichText
						{ ...blockProps }
						identifier="content"
						tagName="p"
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						placeholder="Type something nice here…"
						value={ content }
						onChange={ ( content ) => setAttributes( { content } ) }
					/>
				) }
			</>
		);
	},
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
