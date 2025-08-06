import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { heading } from '@wordpress/icons';
import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';

registerBlockType( metadata.name, {
	icon: heading,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const { content, level } = attributes;
		const blockProps = useBlockProps( {
			style: {
				...calcStyleObject( attributes ),
				textAlign: attributes.textAlign || 'left',
			},
			align: attributes.textAlign || 'left',
		} );
		return (
			<>
				<InspectorControls>
					<TypographyControls { ...props } />
				</InspectorControls>
				<BlockControls>
					<ToolbarGroup>
						<HeadingLevelDropdown
							value={ level }
							onChange={ ( level ) => setAttributes( { level } ) }
						/>
					</ToolbarGroup>
					<AlignmentToolbar
						value={ attributes.textAlign }
						onChange={ ( textAlign ) =>
							setAttributes( { textAlign } )
						}
					/>
				</BlockControls>
				<RichText
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					{ ...blockProps }
					tagName={ `h${ level }` }
					placeholder="Insert a heading..."
					value={ content }
					onChange={ ( val ) => setAttributes( { content: val } ) }
				/>
			</>
		);
	},
	save: ( { attributes } ) => {
		const { content, level } = attributes;
		const blockProps = useBlockProps.save( {
			style: {
				...calcStyleObject( attributes ),
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
