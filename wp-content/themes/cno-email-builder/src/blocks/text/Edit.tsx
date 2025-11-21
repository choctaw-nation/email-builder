import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';
import LinkSettings from '../_shared/LinkSettings';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import useFontData from '../_shared/_useFontData';
import { TextAlignmentControl } from '../_shared/_TextControls';
import { ToolbarGroup } from '@wordpress/components';

export default function Edit( props ) {
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
				<ToolbarGroup>
					<TextAlignmentControl
						value={ attributes.textAlign }
						onChange={ ( textAlign ) =>
							setAttributes( { textAlign } )
						}
						options={ [ 'left', 'center', 'right', 'justify' ] }
					/>
				</ToolbarGroup>
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
}
