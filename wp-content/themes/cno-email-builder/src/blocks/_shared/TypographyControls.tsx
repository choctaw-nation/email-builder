import {
	__experimentalFontFamilyControl as FontFamilyControl,
	LineHeightControl,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	Flex,
	FlexItem,
	FlexBlock,
	FontSizePicker,
	ColorPalette,
} from '@wordpress/components';
import { CSSProperties } from 'react';
import { TextTransformControl } from './_TextControls';

import useColorPalettes from './hooks/useColorPalettes';

export default function TypographyControls( props ) {
	const {
		attributes,
		setAttributes,
		fontSizes,
		fontFamilies,
		fontFamilyString,
		handleFontFamilyChange,
	} = props;
	const colors = useColorPalettes();
	const palettes = Object.values( colors );

	return (
		<Panel header="Typography">
			<PanelBody title="Type Settings">
				<Flex direction="column" gap={ 8 }>
					{ fontFamilies && (
						<FlexBlock>
							<FontFamilyControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								fontFamilies={ fontFamilies }
								value={ fontFamilyString }
								onChange={ handleFontFamilyChange }
							/>
						</FlexBlock>
					) }
					<FlexBlock>
						<FontSizePicker
							__next40pxDefaultSize
							fontSizes={ fontSizes }
							value={ attributes.fontSize }
							onChange={ ( fontSize ) =>
								setAttributes( { fontSize } )
							}
						/>
					</FlexBlock>
					<FlexBlock display="inline-flex">
						<FlexItem>
							<LineHeightControl
								__next40pxDefaultSize
								__unstableInputWidth={ '100px' }
								value={ attributes.lineHeight }
								onChange={ ( lineHeight ) => {
									setAttributes( { lineHeight } );
								} }
							/>
						</FlexItem>
						<FlexItem>
							<TextTransformControl
								value={ attributes.textTransform || 'none' }
								onChange={ ( textTransform ) => {
									setAttributes( { textTransform } );
								} }
							/>
						</FlexItem>
					</FlexBlock>
				</Flex>
			</PanelBody>
			<PanelBody initialOpen={ true } title="Color">
				<Flex direction="column">
					<FlexBlock>
						<ColorPalette
							value={ attributes.color }
							onChange={ ( color ) => setAttributes( { color } ) }
							colors={ palettes }
						/>
					</FlexBlock>
				</Flex>
			</PanelBody>
		</Panel>
	);
}

/**
 * Calculates CSS properties based on passed attributes object
 *
 * @param attributes block attributes
 * @returns CSS Style object
 */
export function calcStyleObject( {
	color,
	fontSize,
	lineHeight,
	textTransform,
	fontFamily,
	fontFamilyOverride,
} ): CSSProperties {
	return {
		color,
		fontSize,
		lineHeight,
		textTransform,
		fontFamily: fontFamilyOverride || fontFamily,
	};
}
