import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';
import { ToolbarGroup, Panel } from '@wordpress/components';

import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import useFontData from '../_shared/_useFontData';
import { TextAlignmentControl } from '../_shared/_TextControls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { content, level } = attributes;
	const fontData = useFontData( { ...props, textType: 'headings' } );
	const blockProps = useBlockProps( {
		style: {
			...calcStyleObject( attributes ),
			...calcSpacingObject( attributes ),
			textAlign: attributes.textAlign || 'left',
		},
		align: attributes.textAlign || 'left',
	} );
	return (
		<>
			<InspectorControls>
				<TypographyControls { ...props } { ...fontData } />
				<Panel>
					<SpacingControls { ...props } only="margin" />
				</Panel>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<HeadingLevelDropdown
						value={ level }
						onChange={ ( level ) => setAttributes( { level } ) }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<TextAlignmentControl
						value={ attributes.textAlign }
						onChange={ ( textAlign ) =>
							setAttributes( { textAlign } )
						}
						options={ [ 'left', 'center', 'right', 'justify' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				{ ...blockProps }
				identifier="content"
				tagName={ `h${ level }` }
				placeholder="Insert a heading..."
				value={ content }
				onChange={ ( val ) => setAttributes( { content: val } ) }
			/>
		</>
	);
}
