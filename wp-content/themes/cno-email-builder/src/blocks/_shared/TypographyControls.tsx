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
import { useEffect, useMemo } from '@wordpress/element';
import { CSSProperties } from 'react';
import { TextTransformControl } from './_TextControls';
import useColorPalettes from './hooks/useColorPalettes';
import useFontData from './_useFontData';

export default function TypographyControls( props ) {
	const { attributes, setAttributes, textType } = props;
	const isHeadings = 'headings' === textType;
	const { choctawLanding, baseColorsPalette } = useColorPalettes();
	const { fontFamilies, fontSizes, headingsFont, bodyFont } =
		useFontData( props );

	const fontFamilyString = useMemo(
		() =>
			attributes.fontFamily ||
			generateFontFamilyString( isHeadings ? headingsFont : bodyFont ),
		[ headingsFont, bodyFont ]
	);
	console.log( 'context-based font family string:', fontFamilyString );
	console.log( 'attribute-based font family string:', attributes.fontFamily );

	useEffect( () => {
		setAttributes( {
			fontFamily: fontFamilyString,
		} );
	}, [ fontFamilyString ] );

	function handleFontFamilyChange( val ) {
		if ( ! val ) {
			setAttributes( {
				fontFamily: fontFamilyString,
			} );
		} else {
			setAttributes( { fontFamily: val } );
		}
	}
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
								value={
									attributes.fontFamily || isHeadings
										? headingsFont
										: bodyFont
								}
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

function generateFontFamilyString( fontFamily: any ): string {
	return `${ fontFamily.name }, ${ fontFamily.fallbackStack.value }`;
}
