import {
	__experimentalFontFamilyControl as FontFamilyControl,
	LineHeightControl,
	store as blockEditorStore,
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
import { useSelect } from '@wordpress/data';

import { CSSProperties } from 'react';
import useFontFamilies from './_useFontFamilies';
import { TextTransformControl } from './_TextControls';
import useColorPalettes from './useColorPalettes';

export default function TypographyControls( { attributes, setAttributes } ) {
	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const { choctawLanding, baseColorsPalette } = useColorPalettes();
	const { defaultFontFamilies } = useFontFamilies();

	return (
		<Panel header="Typography">
			<PanelBody title="Type Settings">
				<Flex direction="column" gap={ 8 }>
					<FlexBlock>
						<FontFamilyControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							fontFamilies={ defaultFontFamilies }
							value={ attributes.fontFamily }
							onChange={ ( fontFamily ) => {
								setAttributes( { fontFamily } );
							} }
						/>
					</FlexBlock>
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
							colors={ [ baseColorsPalette, choctawLanding ] }
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
} ): CSSProperties {
	return {
		color,
		fontSize,
		lineHeight,
		textTransform,
		fontFamily,
	};
}
