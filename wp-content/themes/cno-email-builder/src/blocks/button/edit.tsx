import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import TypographyControls, {
	calcStyleObject,
} from '../_shared/TypographyControls';
import LinkSettings from '../_shared/LinkSettings';
import SpacingControls, { calcSpacingObject } from '../_shared/SpacingControl';
import useFontData from '../_shared/_useFontData';
import { ColorPalette, Panel, PanelBody, RangeControl } from '@wordpress/components';
import useColorPalettes from '../_shared/hooks/useColorPalettes';
import { border } from '@wordpress/icons';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const fontData = useFontData( { ...props, textType: 'body' } );
	const { content, linkDestination, backgroundColor, borderColor, borderWidth, borderRadius } = attributes;
	const blockProps = useBlockProps( {
		style: {
			...calcStyleObject( attributes ),
			...calcSpacingObject( attributes ),
			backgroundColor,
			textAlign: attributes.textAlign || 'left',
			display: 'inline-block',
			textDecoration: 'none',
			borderColor,
			borderRadius,
			borderWidth,
			borderStyle: 'solid',
		},
		align: attributes.textAlign || 'left',
	} );
	const { choctawLanding, baseColorsPalette } = useColorPalettes();
	return (
		<>
			<InspectorControls>
				<div style={ { marginBottom: '1.5rem' } }>
					<Panel header="Button Settings">
						<PanelBody title="Background Color" initialOpen={ true }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( backgroundColor ) =>
									setAttributes( { backgroundColor } )
								}
								colors={ [ baseColorsPalette, choctawLanding ] }
							/>
						</PanelBody>
						<PanelBody title="Border Settings" initialOpen={ true }>
							<ColorPalette
								value={ borderColor }
								onChange={ ( borderColor ) => setAttributes( { borderColor } ) }
								colors={ [ baseColorsPalette, choctawLanding ] }
							/>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								help="Set border width in pixels"
								label="Border Width (px)"
								min={ 0 }
								value={ borderWidth }
								onChange={ ( borderWidth ) => setAttributes( { borderWidth } ) }
							/>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								help="Set border radius in pixels"
								label="Border Radius (px)"
								min={ 0 }
								value={ borderRadius }
								onChange={ ( borderRadius ) => setAttributes( { borderRadius } ) }
							/>
						</PanelBody>
					</Panel>
				</div>
				<TypographyControls { ...props } { ...fontData } />
				<SpacingControls
					{ ...props }
					splitOnAxis={ true }
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
			<RichText
				identifier="content"
				{ ...blockProps }
				tagName="a"
				value={ content }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ ( content ) => setAttributes( { content } ) }
				placeholder="Button text"
				hint="Buttons should link to a web page."
				href={ linkDestination }
				disabled
				aria-disabled={ true }
			/>
		</>
	);
}
