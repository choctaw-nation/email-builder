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

export default function TypographyControls( { attributes, setAttributes } ) {
	const { fontSizes, baseColors } = useSelect( ( select ) => {
		const fontSizes = select( blockEditorStore ).getSettings().fontSizes;
		const baseColors = select( blockEditorStore ).getSettings().colors;
		return { fontSizes, baseColors };
	}, [] );
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
			<PanelBody initialOpen={ false } title="Color">
				<Flex direction="column">
					<FlexBlock>
						<ColorPalette
							value={ attributes.color }
							onChange={ ( color ) => setAttributes( { color } ) }
							colors={ [
								{
									name: 'Base Colors',
									colors: baseColors.map(
										( { name, color } ) => ( {
											name,
											color,
										} )
									),
								},
								{
									name: 'Choctaw Landing',
									colors: [
										{
											name: 'Primary',
											color: '#69813B',
										},
										{
											name: 'Secondary',
											color: '#b96a56',
										},
									],
								},
							] }
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
